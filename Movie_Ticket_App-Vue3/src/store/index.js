import { createStore } from 'vuex';

import largeSidebar from './modules/largeSidebar.js';
import movieDetail from './modules/movieDetail.js';
import home from './modules/home';

export default createStore({
	modules: {
		largeSidebar,
		movieDetail,
		home,
	},
});
