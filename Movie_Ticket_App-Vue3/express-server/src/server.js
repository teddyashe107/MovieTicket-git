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
						'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRjRTN6OGhodUFQQmVIUGdocUl1QSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiYWRtaW4iLCJ4LWhhc3VyYS11c2VyLWlkIjoiYXV0aDB8NjE5MjdlMzIzOGRhZDEwMDZmMmUwZWVhIn0sIm5pY2tuYW1lIjoibWlrZSIsIm5hbWUiOiJtaWtlQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9lMjhmNmY2NDYwOGM5NzBjNjYzMTk3ZDdmZTFmNWE1OT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRm1pLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIxLTExLTI0VDE4OjUzOjI2LjA1M1oiLCJlbWFpbCI6Im1pa2VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi03OGR6ZnRoZy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjE5MjdlMzIzOGRhZDEwMDZmMmUwZWVhIiwiYXVkIjoiWmdPd2VjRjBmR2xEUnZBVTR6Q1dveVRuR1BrRUxRUUgiLCJpYXQiOjE2Mzc4NjY4MzcsImV4cCI6MTYzNzkwMjgzNywibm9uY2UiOiJUSEI2WjBGK2RFUnRhbUpCZEZNNVVrZGZhR1Y2YkU1elJIZDRaWE5vYVd4M04xTlVTMGt1ZGtjMlFRPT0ifQ.s5s-pKctKKJecOQqtSqKQ_CKt-N_UTwZgtD3NqdBXCJTiQVHNtlcQPWeERaewC8cUiEv2_DCI2ijjVDhK_A7AIX9RMSFYVffa7HqX84CjWuqZh1MeDg_1c2ZSTdWJQNRZXq8tQFfxFPGfSJXWc8syh4EBVb1EB2xrIRsYc-4STenwJ069YbVEhixBHKNhaKEdjOnICW-tKYNMTkKnmTyedjX8dmv5ToGROQjKOX9Uh862mRcQgF3eWNTj0ib3XjkYscCM-PfSRk4k-gdsKIgG0e57hklw-2iJFe8hiIjiUlAJWFzEpBYJdXDLViR5Tnd7ngjUOM_Zor9dbvbt57tSg',
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
