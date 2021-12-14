const express = require('express');

const app = express();

const fetch = require('node-fetch');

const bodyParser = require('body-parser');
const fs = require('fs');
const { response } = require('express');

app.use(express.static('public'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: true,
	})
);

const updateMovie = async (req, res, next) => {
	const { movie_id } = req.body.event.data.new;
	try {
		// excute update mutation to movies table
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
					Authorization:
						'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRjRTN6OGhodUFQQmVIUGdocUl1QSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiYWRtaW4iLCJ4LWhhc3VyYS11c2VyLWlkIjoiYXV0aDB8NjFhYTYxNTljZmIwMDUwMDcyYmIxM2I4In0sIm5pY2tuYW1lIjoiYm9zcyIsIm5hbWUiOiJib3NzQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8yOTRiZDNmZjk3OGRkNDJmOTcwNWZkZGQzNzY0NWI0Yz9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmJvLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIxLTEyLTEzVDEyOjE4OjAzLjEwOFoiLCJlbWFpbCI6ImJvc3NAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi03OGR6ZnRoZy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjFhYTYxNTljZmIwMDUwMDcyYmIxM2I4IiwiYXVkIjoiWmdPd2VjRjBmR2xEUnZBVTR6Q1dveVRuR1BrRUxRUUgiLCJpYXQiOjE2MzkzOTc4ODYsImV4cCI6MTYzOTQzMzg4Niwibm9uY2UiOiJkSFJWVTFkVWRVWXpOamRMUkMxMVZuVTFZaloyYmtkMmIwNWxZbWRvV21SVmVuRmpNakZSY25wcVZBPT0ifQ.EbfwWqEvexz7kfhCJl0WR3nVueU5AFxEQ0W55zl9S9ILy7caRtmLGvtOicjMCesj67Vx5Wdxa9-MaL7_F6V4CT0DJE_FohrBlc76lptIntahbnQrNkO3GfxIrr5k_8A4Trfs-TRdWE_cJsq-2GuUvbkSHSbklNJvxmk3wfVPt-wm_LX1aakvwisBqu3zxIAB072-GrerEm5xGYC6nosUfUOeaVgDpSdPtgsTGJHJtVPPNIWWCK5QOgp4cCFZToZgZ5lSBmMKLw_UUR-rdNKma2PmOobBb47eE83KWXzR-F_Qw6PzvD6KFInztRVYVwZu4qwkFk_eCTY6LuT9wecQww',
				},
				body: JSON.stringify({
					query: HASURA_MUTATION,
					variables,
				}),
			}
		);

		const { data, errors } = await fetchResponse.json();
		console.log(data);

		// if Hasura operation errors, then throw error
		if (errors) {
			return res.status(400).json({
				message: errors,
			});
		}

		// success
		return res.json({ msg: 'success' });
	} catch (e) {
		console.error(e);
	}
};
//
const addMovie = async (req, res, next) => {
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
					Authorization:
						'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRjRTN6OGhodUFQQmVIUGdocUl1QSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiYWRtaW4iLCJ4LWhhc3VyYS11c2VyLWlkIjoiYXV0aDB8NjFhYTYxNTljZmIwMDUwMDcyYmIxM2I4In0sIm5pY2tuYW1lIjoiYm9zcyIsIm5hbWUiOiJib3NzQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8yOTRiZDNmZjk3OGRkNDJmOTcwNWZkZGQzNzY0NWI0Yz9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmJvLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIxLTEyLTEzVDEyOjE4OjAzLjEwOFoiLCJlbWFpbCI6ImJvc3NAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi03OGR6ZnRoZy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjFhYTYxNTljZmIwMDUwMDcyYmIxM2I4IiwiYXVkIjoiWmdPd2VjRjBmR2xEUnZBVTR6Q1dveVRuR1BrRUxRUUgiLCJpYXQiOjE2MzkzOTc4ODYsImV4cCI6MTYzOTQzMzg4Niwibm9uY2UiOiJkSFJWVTFkVWRVWXpOamRMUkMxMVZuVTFZaloyYmtkMmIwNWxZbWRvV21SVmVuRmpNakZSY25wcVZBPT0ifQ.EbfwWqEvexz7kfhCJl0WR3nVueU5AFxEQ0W55zl9S9ILy7caRtmLGvtOicjMCesj67Vx5Wdxa9-MaL7_F6V4CT0DJE_FohrBlc76lptIntahbnQrNkO3GfxIrr5k_8A4Trfs-TRdWE_cJsq-2GuUvbkSHSbklNJvxmk3wfVPt-wm_LX1aakvwisBqu3zxIAB072-GrerEm5xGYC6nosUfUOeaVgDpSdPtgsTGJHJtVPPNIWWCK5QOgp4cCFZToZgZ5lSBmMKLw_UUR-rdNKma2PmOobBb47eE83KWXzR-F_Qw6PzvD6KFInztRVYVwZu4qwkFk_eCTY6LuT9wecQww',
				},
				body: JSON.stringify({
					query: HASURA_MUTATION,
					variables,
				}),
			}
		);

		const { data, errors } = await fetchResponse.json();
		console.log(data);

		// if Hasura operation errors, then throw error
		if (errors) {
			return res.status(400).json({
				message: errors,
			});
		}

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

const insertMovie = async (req, res) => {
	console.log(req.body);
};
app.post('/api/upload', addMovie);
app.post('/api/test', (req, res) => {
	// console log req body
	console.log(req.body);
});
app.post('/updateMovie', updateMovie);

app.listen(process.env.PORT || 8000);
