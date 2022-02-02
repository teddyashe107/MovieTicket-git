import createAuth0Client from '@auth0/auth0-spa-js';
import { reactive } from 'vue';
import jwt_decode from 'jwt-decode';

export const AuthState = reactive({
	user: null,
	loading: false,
	isAuthenticated: false,
	auth0: null,
});

export const useAuth0 = (state) => {
	const handleStateChange = async () => {
		state.isAuthenticated = !!(await state.auth0.isAuthenticated());
		state.user = await state.auth0.getUser();
		state.idToken = await state.auth0.getIdTokenClaims();
		//state.nickname = await state.auth0.getUser;
		state.loading = false;
	};

	const initAuth = () => {
		state.loading = true;
		createAuth0Client({
			domain: 'dev-78dzfthg.us.auth0.com',
			client_id: 'ZgOwecF0fGlDRvAU4zCWoyTnGPkELQQH',
			cacheLocation: 'localstorage',
			redirect_uri: window.location.origin,
		}).then(async (auth) => {
			state.auth0 = auth;
			await handleStateChange();
		});
	};

	const login = async () => {
		await state.auth0.loginWithPopup();
		await handleStateChange();
		window.localStorage.setItem('idToken', state.idToken.__raw);
		const userData = JSON.stringify(state.user);
		window.localStorage.setItem('user', userData);
		//console.log(window.localStorage.getItem('user'));
		console.log(window.localStorage.getItem('idToken'));
	};

	const logout = async () => {
		state.auth0.logout({
			returnTo: window.location.origin,
		});
		window.localStorage.removeItem('idToken');
	};

	return {
		login,
		logout,
		initAuth,
	};
};
