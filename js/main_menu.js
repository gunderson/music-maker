define(["TweenMax", "index"],function(){

	require("index");
	require("TweenMax");

	var openBtn = document.querySelector("#open-btn");
	var closeBtn = document.querySelector("#close-btn");
	openBtn.addEventListener("click", function(){
		TweenMax.to("#main-menu", 0.5, {right: 0});
		openBtn.style.display = "none";
		closeBtn.style.display = "block";
	});
	closeBtn.addEventListener("click", function(){
		TweenMax.to("#main-menu", 0.5, {right: -160});
		openBtn.style.display = "block";
		closeBtn.style.display = "none";
	});



	var playBtn = document.querySelector("#play-btn");
	var pauseBtn = document.querySelector("#pause-btn");

	playBtn.addEventListener("click", play);
	pauseBtn.addEventListener("click", stop);

	var visBtn = document.querySelector("#vis-btn");

	visBtn.addEventListener("click", function(){
		window.settings.vis = !settings.vis;
	});

	var elfmanBtn = document.querySelector("#elfman-btn");
	elfmanBtn.addEventListener("click", function(){
		document.querySelector("#elfman-controls").style.display = "block";
		document.querySelector("#demo-controls").style.display = "none";
		changeSong("elfman");
	});

	var progressiveBtn = document.querySelector("#progressive-btn");
	progressiveBtn.addEventListener("click", function(){
		document.querySelector("#elfman-controls").style.display = "none";
		document.querySelector("#demo-controls").style.display = "none";
		changeSong("progressive");
	});

	var demoBtn = document.querySelector("#demo-btn");
	demoBtn.addEventListener("click", function(){
		document.querySelector("#elfman-controls").style.display = "none";
		document.querySelector("#demo-controls").style.display = "block";
		changeSong("demo");
	});

	/**********************************************************/
	// Game Events
	/**********************************************************/
	/*var resetBtn = document.querySelector("#reset-btn");

	resetBtn.addEventListener("click", function(){
		TweenMax.to(currentSong.voices[2], 0.5, {threshold:  0.1});
		TweenMax.to(currentSong.voices[1], 0.5, {threshold:  0.20});
	});*/

	var aceBtn = document.querySelector("#ace-btn");

	aceBtn.addEventListener("click", function(){
		TweenMax.to(currentSong.voices[1], 0.5, {threshold: -0.5});
		TweenMax.to(currentSong.voices[1], 3, {threshold:  0.20, delay: 3});
	});

	var breakBtn = document.querySelector("#break-btn");

	breakBtn.addEventListener("click", function(){
		TweenMax.to(currentSong.voices[2], 0.5, {threshold: -0.5});
		TweenMax.to(currentSong.voices[2], 3, {threshold:  0.1, delay: 3});
		TweenMax.to(currentSong.voices[0], 0.5, {threshold: -0.5});
		TweenMax.to(currentSong.voices[0], 3, {threshold:  0.15, delay: 3});
	});



	/**********************************************************/
	// Demo Events
	/**********************************************************/

	var demo0btn = document.querySelector("#demo-0-btn");

	demo0btn.addEventListener("click", function(){
		TweenMax.to(currentSong.voices[0].cycles.rhythmCycles[1], 2, {scale: 0});
		TweenMax.to(currentSong.voices[0].cycles.rhythmCycles[2], 2, {scale: 0});
		TweenMax.to(currentSong.voices[0].cycles.rhythmCycles[3], 2, {scale: 0});
		TweenMax.to(currentSong.voices[0].cycles.harmonyCycles[0], 2, {scale: 0});
		TweenMax.to(currentSong.voices[0].cycles.harmonyCycles[1], 2, {scale: 0});
	});

	var demo1btn = document.querySelector("#demo-1-btn");

	demo1btn.addEventListener("click", function(){
		TweenMax.to(currentSong.voices[0].cycles.rhythmCycles[1], 2, {scale: 1});
	});

	var demo2btn = document.querySelector("#demo-2-btn");

	demo2btn.addEventListener("click", function(){
		TweenMax.to(currentSong.voices[0].cycles.rhythmCycles[2], 2, {scale: 1});
	});

	var demo3btn = document.querySelector("#demo-3-btn");

	demo3btn.addEventListener("click", function(){
		TweenMax.to(currentSong.voices[0].cycles.rhythmCycles[3], 2, {scale: 1});
	});



	var thresholdbtn = document.querySelector("#threshold-btn");

	thresholdbtn.addEventListener("click", function(){
		TweenMax.to(currentSong.voices[0], 0.5, {threshold: -0.5});
		TweenMax.to(currentSong.voices[0], 3, {threshold:  0.15, delay: 3});
	});

	var harmony = document.querySelector("#harmony-btn");

	harmony.addEventListener("click", function(){
		TweenMax.to(currentSong.voices[0].cycles.harmonyCycles[0], 2, {scale: 0.33});
		TweenMax.to(currentSong.voices[0].cycles.harmonyCycles[1], 2, {scale: 0.27});
	});

})

