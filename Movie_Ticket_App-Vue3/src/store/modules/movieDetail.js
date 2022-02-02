// Create a new store instance.
const movieDetail = {
	namespaced: true,
	state: {
		sidebarToggleProperties: {
			isSideNavOpen: 100,
		},
		movieDetail: {
			movie_name: '',
			movie_description: '',
			rating: '',
			movie_thumbnail: '',
			price: '',
			movie_id: '',
			movie_genre: '',
			movie_director: '',
		},
	},
	getters: {
		getSideBarToggleProperties: (state) =>
			state.sidebarToggleProperties,
	},
	// we cant use async code ---commit
	mutations: {
		toggleSidebarProperties: (state) =>
			(state.sidebarToggleProperties.isSideNavOpen =
				!state.sidebarToggleProperties.isSideNavOpen),
	},
};

// const app = createApp({ /* your root component */ })

export default movieDetail;
