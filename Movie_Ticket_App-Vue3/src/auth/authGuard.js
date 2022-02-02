import { useAuth0, AuthState } from './index';
const { login, logout, initAuth } = useAuth0(AuthState);

export const authGuard = (to, from, next) => {
	initAuth();

	if (to.path === '/admin' || AuthState.isAuthenticated) {
		return next();
	}
};
