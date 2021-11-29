import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents from 'vite-plugin-components';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), ViteComponents()],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},

	optimizeDeps: {
		include: ['zen-observable', '@vue/apollo-composable'],
	},
});
