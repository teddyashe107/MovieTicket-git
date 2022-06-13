import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Test from '../views/Test.vue';
import Form from '../views/Form.vue';
import MovieDetails from '../views/MovieDetails.vue';
import Movies from '../views/admin/Movies.vue';
import Profile from '../views/admin/Profile.vue';
import Reservatons from '../views/admin/Reservations.vue';
import ScheduledMovies from '../views/admin/ScheduledMovies.vue';
import SearchExample from '../views/SearchExample.vue';

import Example from '../views/Example.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import Sidebar from '../layouts/admin/layouts/Sidebar.vue';
import ThankYou from '../views/ThankYou.vue';

import { authGuard } from '../auth/authGuard';

const user = window.localStorage.getItem('user');

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../layouts/Index.vue'),
		meta: {
			title: 'Home',
		},

		children: [
			{
				path: '',
				component: Home,
			},
			{
				path: 'thank-you',
				name: 'ThankYou',
				component: ThankYou,
			},

			{
				path: 'movie-details/:id',
				name: 'ViewMovie',
				component: MovieDetails,
				props: true,
				children: [
					{
						path: '/movie/:path(.*)',
						component: MovieDetails,
					},
				],
			},
		],
	},

	{
		path: '/test',
		name: 'Test',
		component: Test,
		props: true,
	},
	{
		path: '/form',
		name: 'form',
		component: Form,
		props: true,
	},

	{
		path: '/searchexample',
		component: SearchExample,
		meta: {
			title: 'Home',
		},
	},
	{
		path: '/example',
		name: 'Example',
		component: Example,
	},

	{
		path: '/sidebar',
		component: Sidebar,
	},
	{
		path: '/admin',
		name: 'Admin',
		component: () => import('../layouts/admin/index.vue'),
		redirect: '/admin/dashboard',
		//beforeEnter: authGuard,
		children: [
			{
				path: 'dashboard',
				name: 'Dashboard',
				component: Dashboard,
			},

			{
				path: 'movies',
				name: 'Movies',
				component: Movies,
			},
			{
				path: 'reservations',
				name: 'Reservation',
				component: Reservatons,
			},
			{
				path: 'scheduledmovies',
				name: 'ScheduledMovies',
				component: ScheduledMovies,
			},

			{ path: 'profile', name: 'Profile', component: Profile },
		],
	},
	{ path: '/uploads', component: () => import('../views/UploadImage.vue') },
	{ path: '/:path(.*)', component: NotFound },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
