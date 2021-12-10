module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			padding: {
				'1/3': '33.333333%',
				'2/3': '66.666667%',
			},
		},
	},
	variants: {
		extend: {},
	},

	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],
	/*
	daisyui: {
		styled: false,
		themes: false,
		base: false,
		utils: false,
		logs: false,
		rtl: false,
	},
	*/
};
