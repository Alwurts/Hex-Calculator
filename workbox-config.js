module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{png,svg,css,json,scss,woff,woff2,html,js,md}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'sw.js'
};