import { createApp, h, provide } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router';
import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	gql,
} from '@apollo/client';
import { ApolloClients, DefaultApolloClient } from '@vue/apollo-composable';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: 'https://movie-ticket.hasura.app/v1/graphql',
});
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('idToken');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});
const apolloClientA = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

const app = createApp(App);
app.provide(ApolloClients, {
	default: apolloClientA,
	clientA: apolloClient,
});
app.use(router);
app.mount('#app');
