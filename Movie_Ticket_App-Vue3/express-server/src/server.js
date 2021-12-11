const express = require('express');

const app = express();

const PORT = 8000;

const fetch = require('node-fetch');

const bodyParser = require('body-parser');
const fs = require('fs');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: true,
		parameterLimit: 50000,
	})
);
const fileUpload = async (req, res, next) => {
	const { name, type, base64str } = req.body.input;
	let fileBuffer = Buffer.from(base64str, 'base64');
	try {
		fs.writeFileSync('../public/images/' + name, fileBuffer, 'base64');
		// insert into db
		const HASURA_MUTATION = `
		mutation ($file_path: String!) {
			insert_images_one(object: {file_path: $file_path}) {
			  id
			}
		  }
		  
	  `;
		const variables = { file_path: '/images/' + name };

		// execute the parent mutation in Hasura
		const fetchResponse = await fetch(
			'https://movie-ticket.hasura.app/v1/graphql',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRjRTN6OGhodUFQQmVIUGdocUl1QSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiYWRtaW4iLCJ4LWhhc3VyYS11c2VyLWlkIjoiYXV0aDB8NjFhYTYxNTljZmIwMDUwMDcyYmIxM2I4In0sIm5pY2tuYW1lIjoiYm9zcyIsIm5hbWUiOiJib3NzQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8yOTRiZDNmZjk3OGRkNDJmOTcwNWZkZGQzNzY0NWI0Yz9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmJvLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIxLTEyLTExVDE3OjU5OjI0LjQyNVoiLCJlbWFpbCI6ImJvc3NAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi03OGR6ZnRoZy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjFhYTYxNTljZmIwMDUwMDcyYmIxM2I4IiwiYXVkIjoiWmdPd2VjRjBmR2xEUnZBVTR6Q1dveVRuR1BrRUxRUUgiLCJpYXQiOjE2MzkyNDU2MTAsImV4cCI6MTYzOTI4MTYxMCwibm9uY2UiOiJablZFUlRoaE9HUmxVVk5wZmxwVE1HeEhOSGh3YzAxbWVqbHphV0pCTGtaRU5UWlZXVFJSY0hnM1pBPT0ifQ.colxVB3AyBdrPnvuzIDOu4nWraT4ZDBSEasRX3Q2ElIRK2hTLAFFZF1cSR7lVAtGXP-sH6pCg_J2r6qiIT7wsRRRDmq-yhDKOBGJVau5JEz5oK_HZ6X_P_FiYXheXdBB_1UP5QiCxMTd1vZOSXEDuiE-M9m84ifcwcYlRheGlQHtYHGrnV0Ry8RWDXzBn2nhJ26ZLS7UPFgrrReUG8vV0K8svRjrupL7Cr37rrhf-d0ADr79kTA70fESXp2IoeCA7Nx-F49j3DdUxpr-fddVrrxJ3aLizGykIqDfP8vZsVCxKHS-cxLtwctfhj4ssDkNQ_lZsgKASNj2V17t5YnQng',
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
		return res.json({ file_path: '/images/' + name });
	} catch (e) {
		next(e);
	}
};

const addMovie = async (req, res, next) => {
	const {
		actor_name,
		director_name,
		base64str,
		image_name,
		movie_name,
		movie_type,
		movie_description,
		published_year,
	} = req.body.input;

	let fileBuffer = Buffer.from(base64str, 'base64');
	try {
		fs.writeFileSync(
			'../public/images/' + image_name,
			fileBuffer,
			'base64'
		);
		// insert into db
		const HASURA_MUTATION = `
		mutation InsertMovie($movie_name: String!, $movie_description: String!, $movie_thumbnail: String!, $movie_type: String!, $published_year:date!, $actor_name:String!, $director_name: String! ) {
			insert_movies_one(object: {
			  movie_name:$movie_name,
			  movie_description: $movie_description,
			  movie_thumbnail: $movie_thumbnail,
			  movie_type: $movie_type,
			  published_year: $published_year,
			  actor_name: $actor_name,
			  director_name: $director_name}) {
			  id
			}
		  }
		  
		  
	  `;
		const variables = {
			movie_name: movie_name,
			movie_description: movie_description,
			movie_thumbnail: '/images/' + image_name,
			movie_type: movie_type,
			published_year: published_year,
			actor_name: actor_name,
			director_name: director_name,
		};

		// execute the parent mutation in Hasura
		const fetchResponse = await fetch(
			'https://movie-ticket.hasura.app/v1/graphql',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRjRTN6OGhodUFQQmVIUGdocUl1QSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiYWRtaW4iLCJ4LWhhc3VyYS11c2VyLWlkIjoiYXV0aDB8NjFhYTYxNTljZmIwMDUwMDcyYmIxM2I4In0sIm5pY2tuYW1lIjoiYm9zcyIsIm5hbWUiOiJib3NzQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8yOTRiZDNmZjk3OGRkNDJmOTcwNWZkZGQzNzY0NWI0Yz9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmJvLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIxLTEyLTEwVDE5OjEwOjQ5LjAyOVoiLCJlbWFpbCI6ImJvc3NAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi03OGR6ZnRoZy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjFhYTYxNTljZmIwMDUwMDcyYmIxM2I4IiwiYXVkIjoiWmdPd2VjRjBmR2xEUnZBVTR6Q1dveVRuR1BrRUxRUUgiLCJpYXQiOjE2MzkxNjM0NTMsImV4cCI6MTYzOTE5OTQ1Mywibm9uY2UiOiJZMWMzT1hWQk9UWjNSbkJFY2xGclpFeHZVRVZrVTBsa2FITTBWVlV6TjNSMU1saEdjMVY2ZmkxeVpnPT0ifQ.Etz5liPtqlLqlUNlOHLk3qK60aF1O3R5csj97FYoPZnq_pIaVYv2ERW5THKbvEpEy9bdvWcrFbRJqzWwvTwn_CQ87g2GPFYFUgapPtx3x6Mz-rwZPKLrn0i3PuzZKntBJBjpCmFSB2ROLAnLDxD6X9X2pt84ThtxAihwv6mVKBKPn-9NprDhGHncp7tE7PPNHrpfAD03XyUQjtV5e0LB9U_XXEfz9kHcxGAq1WdLVhVgUeuOUJXwqSHz28ZmJ3zigY_GcJ0_Q7fi4Bz2tcDPg7bJXBzkftsHtxeRvQE350JKoraGG-jvgD-tK5u1wTB9_lOBmlv1zKaMuNKNllovSQ',
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
		return res.json({ movie_name: movie_name });
	} catch (e) {
		next(e);
	}
};

app.post('/insertmovie', fileUpload);
app.post('/addMovie', addMovie);

app.listen(PORT);
