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

// http link for the server
const httpLink = createHttpLink({
	uri: 'https://movie-ticket.hasura.app/v1/graphql',
});

// ws link for the server

const wsLink = new WebSocketLink({
	uri: 'ws://movie-ticket.hasura.app/v1/graphql',
	options: {
		reconnect: true,
	},
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
	//	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export const initializeApollo = () => {
	provideApolloClient(apolloClientA);
};
