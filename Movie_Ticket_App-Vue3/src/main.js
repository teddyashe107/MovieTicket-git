import { createApp } from 'vue';
import store from './store';

// perfectscrollbar plugins
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
//import VueApexCharts from "vue3-apexcharts";

import App from './App.vue';
import './style.css';
//import './assets/scss/global.scss';
import VueApexCharts from 'vue3-apexcharts';
import router from './router';
import {
	ApolloClient,
	createHttpLink,
	split,
	InMemoryCache,
	gql,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClients, DefaultApolloClient } from '@vue/apollo-composable';
import { setContext } from '@apollo/client/link/context';
import { Vue } from 'vue-demi';
/*
const wsLink = new WebSocketLink({
	uri: 'ws://https://movie-ticket.hasura.app/v1/graphql',
	options: {
		reconnect: true,
	},
});
*/
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
/*
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
*/
const apolloClientA = new ApolloClient({
	//link: link,
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

//library.add(fas);

const app = createApp(App);

app.provide(ApolloClients, {
	default: apolloClientA,
});

app.use(store);
app.use(VueApexCharts);
app.use(PerfectScrollbar);
app.use(router);
app.mount('#app');
