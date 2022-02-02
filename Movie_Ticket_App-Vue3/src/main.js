import { createApp } from 'vue';
import store from './store';
import './validators';
// firebase

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
	apiKey: 'AIzaSyAFXbnzzuMW7TnwzRQ8newU7LNIEpW63KQ',
	authDomain: 'movie-ticket-bc363.firebaseapp.com',
	projectId: 'movie-ticket-bc363',
	storageBucket: 'movie-ticket-bc363.appspot.com',
	messagingSenderId: '933703866148',
	appId: '1:933703866148:web:17b7e77f5e47f7d4c705b1',
	measurementId: 'G-9GCGGQD93D',
};
// initialtize firebase

initializeApp(firebaseConfig);
// perfectscrollbar plugins
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
//import VueApexCharts from "vue3-apexcharts";

import App from './App.vue';
import './style.css';
import './assets/scss/global.scss';
import VueApexCharts from 'vue3-apexcharts';
import router from './router';
import {
	ApolloClient,
	createHttpLink,
	split,
	InMemoryCache,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { provideApolloClient } from '@vue/apollo-composable';
import { setContext } from '@apollo/client/link/context';

import 'sweetalert2/dist/sweetalert2.min.css';

const wsLink = new WebSocketLink({
	uri: 'ws://movie-ticket.hasura.app/v1/graphql',
	options: {
		reconnect: true,
		connectionParams: {
			// Pass any arguments you want for initialization
			Authorization: `Bearer ${localStorage.getItem('idToken')}`,
		},
	},
});

// http link for the server
const httpLink = createHttpLink({
	uri: 'https://movie-ticket.hasura.app/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('idToken');
	// return the headers to the context so httpLink can read them
	if (token) {
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		};
	} else {
		return;
	}
});

const link = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	authLink.concat(httpLink)
);

const apolloClientA = new ApolloClient({
	link: link,
	//link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
// const apolloClient = new ApolloClient({
// 	link: httpLink,
// 	cache: new InMemoryCache(),
// });

//library.add(fas);

const app = createApp(App);

app.provide(apolloClientA);

app.use(store);
app.use(VueApexCharts);
app.use(PerfectScrollbar);

app.use(router);
app.mount('#app');
