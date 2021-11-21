import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Test from '../views/Test.vue';
import MovieDetails from '../views/MovieDetails.vue';

//import { routeGuard } from '../auth'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../layouts/Index.vue'),
		children: [
			{
				path: '',
				component: Home,
			},
			{
				path: 'movie/:id',
				name: 'MovieDetails',
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

	{ path: '/test', component: Test },
	{ path: '/test', component: Home },

	{ path: '/:path(.*)', component: NotFound },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
