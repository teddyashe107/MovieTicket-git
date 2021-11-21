import createAuth0Client from '@auth0/auth0-spa-js';
import { reactive } from 'vue';
import jwt_decode from 'jwt-decode';

export const AuthState = reactive({
	user: null,
	loading: false,
	isAuthenticated: false,
	auth0: null,
});

const config = {
	domain: import.meta.env.VITE_AUTH0_DOMAIN,
	client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
};

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
		//window.localStorage.setItem('user_id', state.user.userId);
		const myToken = jwt_decode(window.localStorage.getItem('idToken'));
		//console.log(state.user);
	};

	const logout = async () => {
		state.auth0.logout({
			returnTo: window.location.origin,
		});
	};

	const getToken =  () => {
		const myToken =   jwt_decode(window.localStorage.getItem('idToken'));

		return myToken.sub;
	};

	return {
		login,
		logout,
		initAuth,
		getToken,
	};
};
