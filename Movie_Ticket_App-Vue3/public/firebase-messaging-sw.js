importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

const firebaseConfig = {
	apiKey: 'AIzaSyAFXbnzzuMW7TnwzRQ8newU7LNIEpW63KQ',
	authDomain: 'movie-ticket-bc363.firebaseapp.com',
	projectId: 'movie-ticket-bc363',
	storageBucket: 'movie-ticket-bc363.appspot.com',
	messagingSenderId: '933703866148',
	appId: '1:933703866148:web:17b7e77f5e47f7d4c705b1',
	measurementId: 'G-9GCGGQD93D',
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
// messaging.setBackgroundMessageHandler(function (payload) {
// 	console.log(
// 		'[firebase-messaging-sw.js] Received background message ',
// 		payload
// 	);
// 	const notificationTitle = 'Background Message from html';
// 	const notificationOptions = {
// 		body: 'Background Message body.',
// 		icon: '/firebase-logo.png',
// 	};
//
// 	return self.registration.showNotification(
// 		notificationTitle,
// 		notificationOptions
// 	);
// });
