// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

const firebase = require('firebase');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAFXbnzzuMW7TnwzRQ8newU7LNIEpW63KQ',
	authDomain: 'movie-ticket-bc363.firebaseapp.com',
	projectId: 'movie-ticket-bc363',
	storageBucket: 'movie-ticket-bc363.appspot.com',
	messagingSenderId: '933703866148',
	appId: '1:933703866148:web:17b7e77f5e47f7d4c705b1',
	measurementId: 'G-9GCGGQD93D',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebase);

exports.user = 'teddy';

// module.exports
