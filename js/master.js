// entry point for requirejs
define(["require_config"], function () {

	require([

		"index",
		"lodash",
		"jquery",
		"TweenMax",
		"Klang",
		"main_menu",

	], function (index, main_menu, _, $) {
		index.setup();
	});
});