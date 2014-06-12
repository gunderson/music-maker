var playBtn = document.querySelector("#play-btn");
var pauseBtn = document.querySelector("#pause-btn");
var waltzBtn = document.querySelector("#waltz-btn");
var submarineBtn = document.querySelector("#submarine-btn");
var stairwayBtn = document.querySelector("#stairway-btn");
var siaBtn = document.querySelector("#sia-btn");

playBtn.addEventListener("click", play);
pauseBtn.addEventListener("click", stop);

waltzBtn.addEventListener("click", function(){
	changeSong("waltz");
});
submarineBtn.addEventListener("click", function(){
	changeSong("submarine");
});
stairwayBtn.addEventListener("click", function(){
	changeSong("stairway");
});
siaBtn.addEventListener("click", function(){
	changeSong("sia");
});