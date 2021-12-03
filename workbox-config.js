module.exports = {
	globDirectory: 'pomodoro/',
	globPatterns: [
		'**/*.{css,html,js}'
	],
	swDest: 'pomodoro/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};