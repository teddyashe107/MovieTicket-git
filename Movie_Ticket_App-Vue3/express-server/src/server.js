import dotenv from 'dotenv';
dotenv.config();
//const express = require('express');
import express from 'express';

//const fetch = require('node-fetch');
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
//const bodyParser = require('body-parser');
//const fs = require('fs');
import fs from 'fs';
import { async } from '@firebase/util';

const app = express();
app.use(express.static('public'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: true,
	})
);

// update the columen isPublished when the movie is scheduled (this function is trigger by hasura update event)
const updateMovie = async (req, res, next) => {
	// get the event input
	const movie_id = req.body.event.data.new.movie_id;
	//const autho = req.body.event.session_variables
	//	console.log(req.body);
	///	console.log(req.body.event.session_variables);
	//perform update mutation on the movies table
	try {
		//  update mutation to movies table
		const HASURA_MUTATION = `
			mutation updateMovie($id: Int!) {
				update_movies_by_pk(pk_columns: {id: $id}, _set: {is_published: "true"}) {
				  id
				}
			  }
			  `;
		const variables = {
			id: movie_id,
		};

		// execute the parent mutation in Hasura
		const fetchResponse = await fetch(
			'https://movie-ticket.hasura.app/v1/graphql',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: HASURA_MUTATION,
					variables,
				}),
			}
		);

		const response = await fetchResponse.json();
		console.log(res);

		// if Hasura operation errors, then throw error
		// if (errors) {
		// 	return res.status(400).json({
		// 		message: errors,
		// 	});
		// }

		// success
		return res.json({ msg: 'success' });
	} catch (e) {
		console.error(e);
	}
};

// add new movie to the movies table
const addMovie = async (req, res, next) => {
	//console.log(req.headers.authorization);
	const reqHeader = req.headers.authorization;
	const {
		actor_name,
		director_name,
		rating,
		base64str,
		image_name,
		movie_name,
		movie_type,
		movie_description,
		published_year,
	} = req.body;

	let fileBuffer = Buffer.from(base64str, 'base64');

	try {
		fs.writeFileSync(
			'../public/images/' + image_name,
			fileBuffer,
			'base64'
		);

		// insert into db
		const HASURA_MUTATION = `
			mutation addMovie($actor_name: String!, $director_name: String!, $rating: Int!, $movie_name: String!, $movie_description: String!, $movie_thumbnail: String!, $movie_type: String!, $published_year: date!) {
				insert_movies_one(
				  object: {
					actor_name: $actor_name,
					director_name: $director_name,
					rating: $rating,
					movie_name:$movie_name,
					movie_description: $movie_description,
					movie_thumbnail: $movie_thumbnail,
					movie_type: $movie_type,
					published_year: $published_year}) {
				  id
				}
			  }
			  `;
		const variables = {
			actor_name: actor_name,
			director_name: director_name,
			rating: rating,
			movie_name: movie_name,
			movie_description: movie_description,
			movie_thumbnail: '/images/' + image_name,
			movie_type: movie_type,
			published_year: published_year,
		};

		// execute the parent mutation in Hasura
		const fetchResponse = await fetch(
			'https://movie-ticket.hasura.app/v1/graphql',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer' + ' ' + reqHeader,
				},
				body: JSON.stringify({
					query: HASURA_MUTATION,
					variables,
				}),
			}
		);

		const response = await fetchResponse.json();
		console.log(response);
		// if (data) {
		// 	console.log(data);
		// }
		// 		console.log(data);
		//
		// 		// if Hasura operation errors, then throw error
		// 		if (errors) {
		// 			return res.status(400).json({
		// 				message: errors,
		// 			});
		// 		}

		// success
		return res.json({ msg: 'success' });
	} catch (e) {
		console.error(e);
	}
};

//
// app.post('/insertmovie', fileUpload);
// app.post('/addMovie', addMovie);
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'x-requested-with, Content-Type, origin, authorization, accept, client-security-token'
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

// get firebase cloud messaging token
// let token = '';
// const fcmToken = async (req, res) => {
// 	const data = await req.body.fcmTokens;
// 	token = data;
// 	if (data) {
// 	} else {
// 		console.log('something went wrong');
// 	}
// 	res.send('success');
// };

// get hasura event data and send notification
//
async function sendNotification(req, res) {
	//	console.log(req.body.event.data.new);

	const GET_MOVIE = `
	query getMovie($id: Int!) {
		movies_by_pk(id: $id) {
			movie_name
			movie_thumbnail
			movie_description
		}
	  }
	  
	  `;

	const variables = {
		id: req.body.event.data.new.movie_id,
	};

	const HASURA_QUERY = `
		query getToken {
			fcm_token {
			  fcm_token
			}
		  }
		  `;
	// execute query in Hasura
	const response = await fetch(
		'https://movie-ticket.hasura.app/v1/graphql',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: HASURA_QUERY,
			}),
		}
	);

	const { data, errors } = await response.json();

	let token = [];
	if (data) {
		data.fcm_token.forEach((value) => token.push(value.fcm_token));
	} else console.log(errors);

	// execute query in Hasura
	const response2 = await fetch(
		'https://movie-ticket.hasura.app/v1/graphql',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: GET_MOVIE,
				variables,
			}),
		}
	);

	const va = await response2.json();
	//console.log(va.data.movies_by_pk.movie_name);

	// send notification
	try {
		const registration_ids = token;
		const title =
			'New Movie Published' + va.data.movies_by_pk.movie_name;
		const paylod = va.data.movies_by_pk.movie_description;
		const body = {
			registration_ids: registration_ids,
			notification: {
				title: title,
				body: paylod,
				icon: va.data.movies_by_pk.movie_thumbnail,
				click_action: 'http://localhost:3000/',
			},
		};
		const options = {
			method: 'POST',
			headers: {
				Authorization: 'key=' + process.env.SERVER_KEY,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};

		fetch('https://fcm.googleapis.com/fcm/send', options)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});

		res.send('success');
	} catch (e) {
		console.log(e);
		res.send('error');
	}
}

// upload new movie to movies table
app.post('/api/upload', addMovie);

// update ispublished table of movies when an event is triggered
app.post('/updateMovie', updateMovie);

// get firebase cloud messaging token
//app.post('/getNotification', fcmToken);
app.post('/sendNotification', sendNotification);
app.listen(process.env.PORT || 8000);
