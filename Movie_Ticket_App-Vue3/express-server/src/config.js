const firebase = require('firebase');

const firebaseConfig = {
	apiKey: 'AIzaSyAFXbnzzuMW7TnwzRQ8newU7LNIEpW63KQ',
	authDomain: 'movie-ticket-bc363.firebaseapp.com',
	projectId: 'movie-ticket-bc363',
	storageBucket: 'movie-ticket-bc363.appspot.com',
	messagingSenderId: '933703866148',
	appId: '1:933703866148:web:17b7e77f5e47f7d4c705b1',
	measurementId: 'G-9GCGGQD93D',
};

const firebase = initializeApp(firebaseConfig);

module.exports = firebase;
