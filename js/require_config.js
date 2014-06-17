
require.config({
    waitSeconds: 200,
	paths: {

		"jquery": "../bower_components/jquery/dist/jquery.min",
		"lodash": "../bower_components/lodash/dist/lodash.min",
		"TweenMax": "../bower_components/greensock/src/minified/TweenMax.min",
		"Klang": "http://klangfiles.s3.amazonaws.com/uploads/projects/l1Aoa/klang"

	},
	shim:{
		"Klang" : {
			exports:"Klang",
			deps:[
			]
		}
	}

	// This will help with cache issues related to development.
	// urlArgs: "bust=" + Number(new Date())
});