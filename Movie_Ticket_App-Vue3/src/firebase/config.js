// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import {
	useQuery,
	useMutation,
	useSubscription,
	useResult,
} from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

// import apollo clinet
import { initializeApollo } from '@/store/apollo.js';
initializeApollo();

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
export const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

// get firebase messaging instance fcm

export const messaging = getMessaging();

onMessage(messaging, (payload) => {
	console.log('Message received: ', payload);
	// ...
});

export async function sendNotification() {
	const permission = await Notification.requestPermission();
	const fcmToken = await getToken(messaging, {
		vapidKey: 'BD6innh9l4gkwEJnDA5ldno4-xUPPXnwXY9qFT13PIvhaUF_egPP_jhcPKHXTAYvrXOlEWpGn-GPVXmYEKkeABE',
	});
	try {
		messaging.subs;
		const { mutate: sendToken } = useMutation(
			gql`
				mutation insertToken($fcm_token: String!) {
					insert_fcm_token_one(
						object: { fcm_token: $fcm_token }
					) {
						id
					}
				}
			`
		);
		sendToken({ fcm_token: fcmToken });
		//console.log(fcmToken);
		// // Send the token to your server and update the UI if necessary
		// fetch('http://localhost:8000/getNotification', {
		// 	mode: 'cors',
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({
		// 		fcmTokens: fcmToken,
		// 	}),
		// });
		// const { data, errors } = await fetchResponse.json();
		// console.log(data);
	} catch (e) {
		console.error(e);
	}
}
