/***************************************************/
// Infrastructure
/***************************************************/

Math.TAU = Math.PI * 2;

var r_canvas = document.querySelector("#r_canvas");
var r_ctx = r_canvas.getContext("2d");
var p_canvas = document.querySelector("#p_canvas");
var p_ctx = p_canvas.getContext("2d");

var loopFrameId = false;
var frameCount = 0;

var octaveRange = 4;
var noteIds = [];

var beatRate;

var chordIndex = 0;

var loadedFiles = 0;

var settings = {};

function setup(){
	window.onresize = onResize;
	onResize();

	settings = {
		offsetY: r_canvas.offsetHeight >> 1,
		amplitude: -r_canvas.offsetHeight >> 2,
		speedX: 3, // px/frame
		threshold: 0.1,
		bassFrequency: 2
	};

	changeSong('waltz');

	play();
	beat();
}


function loop(){
	update();
	draw();
	playNotes();

	loopFrameId = requestAnimationFrame(loop);
}

function play(){
	if(!loopFrameId) {
		loopFrameId = requestAnimationFrame(loop);
	}
}

function stop(){
	cancelAnimationFrame(loopFrameId);
	loopFrameId = false;
	metronomeId = false;
}

var notesToPlay = []
function update(){
	frameCount++;
	shiftCycle(currentSong.rhythmCycles);
	shiftCycle(currentSong.pitchCycles)
	shiftCycle(currentSong.harmonyCycles)


	notesToPlay = []

	if (inflection(currentSong.rhythmCycles.buffer) === -1 &&
		currentSong.rhythmCycles.buffer[0] >= settings.threshold){
		var notes;
		var melodyIndex = 0.5 * (1 + currentSong.pitchCycles.buffer[0]);
		melodyIndex = (melodyIndex * noteIds.length) >> 0;
		melodyIndex = clamp(melodyIndex, 0, noteIds.length - 1)

		var harmonyIndex = 0.5 * (1 + currentSong.pitchCycles.buffer[0] + currentSong.harmonyCycles.buffer[0]);
		harmonyIndex = (harmonyIndex * noteIds.length) >> 0;
		harmonyIndex = clamp(harmonyIndex, 0, noteIds.length - 1)

		highlightNote(melodyIndex,harmonyIndex);

		if (notesToPlay.indexOf(noteIds[melodyIndex]) === -1) notesToPlay.push(noteIds[melodyIndex]);
		if (notesToPlay.indexOf(noteIds[harmonyIndex]) === -1) notesToPlay.push(noteIds[harmonyIndex]);
	}

}

function draw(){
	moveBeatMarkersX();
	
	if (inflection(currentSong.rhythmCycles[0].buffer) === -1){
		beat();
	}
	

	// clear canvases hack
	r_canvas.height = r_canvas.height;
	p_canvas.height = p_canvas.height;



	drawBeats(r_ctx);
	drawBeats(p_ctx);
	drawComposite(r_ctx, currentSong.rhythmCycles.buffer);

	drawComposite(p_ctx, Array.add(currentSong.pitchCycles.buffer, currentSong.harmonyCycles.buffer), "#088");
	drawComposite(p_ctx, currentSong.pitchCycles.buffer);

	drawthreshold(r_ctx);
}

function playNotes(){
	console.log(notesToPlay)
	for (var i = 0, endi = notesToPlay.length; i < endi; i++){
		createjs.Sound.play(notesToPlay[i]);
	}
}


function onSoundsLoad(event) {
	if (++loadedFiles >= numNotes){
    	setup();
	}
}

function onResize(){
	p_canvas.height = document.body.offsetHeight >> 1;
	p_canvas.width = document.body.offsetWidth;
	r_canvas.height = document.body.offsetHeight >> 1;
	r_canvas.width = document.body.offsetWidth;

	settings.offsetY = r_canvas.height >> 1;
	settings.amplitude = -r_canvas.height >> 2;

	scalePitchMarkers()
}

/***************************************************/
// APPLICATION
/***************************************************/

var beatMarkersX = [];
var pitchMarkers = [];
var numBeats = 0;

var currentSong;

var changes;


function changeSong(songName){
	changeTempo(songs[songName].tempo);
	currentSong = songs[songName];
	changes = songs[songName].changes;
	noteIds = getNotesInChord(changes[0]);
	chordIndex = 0;

	settings.threshold = songs[songName].threshold;
	settings.bassFrequency = songs[songName].bassFrequency;
	settings.changeRate = songs[songName].changeRate;

	document.querySelector("h2 #key").innerHTML = changes[0];
	makePitchMarkers(noteIds.length);
	scalePitchMarkers();

	console.log(songs[songName])
}

function changeTempo(tempo){
	var bpm = tempo;
	//time between beats
	var beatTime = 60000 / bpm;
	//1000 / framerate
	var cycleUpdateTime = 1000 / 60;
	//frames per beat
	var cyclesPerBeat = beatTime / cycleUpdateTime;
	beatRate = Math.TAU / cyclesPerBeat;
}


function changeChord(){
	chordIndex = (chordIndex + 1) % changes.length;
	noteIds = getNotesInChord(changes[chordIndex]);
	document.querySelector("h2 #key").innerHTML = changes[chordIndex];
	makePitchMarkers(noteIds.length);
	scalePitchMarkers();
}

function makePitchMarkers(num){
	var container = document.querySelector('#pitch-markers');
	container.innerHTML = "";
	pitchMarkers = [];
	for (var i = 0; i < num; i++){
		var pitchMarker = document.createElement("div");
		pitchMarker.classList.add('pitch-marker');
		container.appendChild(pitchMarker);
		pitchMarkers.push(pitchMarker);
	}
}

function scalePitchMarkers(){
	var container = document.querySelector('#pitch-markers');
	for (var i = 0, endi = pitchMarkers.length; i < endi; i++){
		pitchMarkers[i].style.height = ((container.offsetHeight / endi) - 1) + "px";
	}
}

function shiftCycle(cycle){
	var cycleValue = composeCycles(cycle);
	var maxBufferLength = r_canvas.offsetWidth / settings.speedX;
	cycle.buffer.unshift(cycleValue);	
	if (cycle.buffer.length >= maxBufferLength){
		cycle.buffer.pop();
	}
	return this;
}

function moveBeatMarkersX(){
	for (var i = 0, endi = beatMarkersX.length; i < endi; i++){
		beatMarkersX[i] += settings.speedX;
		if (beatMarkersX[i] > r_canvas.width){
			beatMarkersX.pop();
		}
	}
}

function inflection(buffer){
	var delta0 = buffer[0] - buffer[1];
	var delta1 = buffer[1] - buffer[2];

	var s0 = delta0 > 0 ? 1 : -1;
	var s1 = delta1 > 0 ? 1 : -1;

	if (s0 > s1) return 1;
	if (s0 < s1) return -1;
	return 0;
}

function composeCycles(cycles){
	var maxBufferLength = r_canvas.offsetWidth / settings.speedX;
	return d3.mean(
		cycles.map(function(obj){
			//magic math here
			obj.buffer.unshift(Math.cos(frameCount * obj.rate * beatRate) * obj.scale);
			if (obj.buffer.length >= maxBufferLength || obj.noBuffer === true){
				obj.buffer.pop();
			}
			return obj.buffer[0];
		})
	);
}

function beat(){
	++numBeats;
	beatMarkersX.unshift(settings.speedX / 2);
	if (beatMarkersX[0] > r_canvas.width) beatMarkersX.pop();
	if (numBeats % settings.changeRate === 0) changeChord();

	var bassNote = changes[chordIndex].substr(0,1) + 0

	if (numBeats % settings.bassFrequency === 0 &&
		notesToPlay.indexOf(bassNote) === -1) {

		notesToPlay.push(bassNote);
	}
}

/***************************************************/
// Drawing
/***************************************************/

function drawComposite(ctx, buffer, color){
	color = color || "#fff";

	var amp = settings.amplitude,
		offY = settings.offsetY;
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(0,offY + buffer[0] * amp);
	for (var i = 1, endi = buffer.length; i < endi; i++){
		ctx.lineTo(i * settings.speedX, offY + buffer[i] * amp);
	}
	ctx.stroke();
}

function drawBeats(ctx){
	ctx.strokeStyle = "#011";
	ctx.beginPath();
	for (var i = 0, endi = beatMarkersX.length; i < endi; i++){
		ctx.moveTo(beatMarkersX[i], 0);
		ctx.lineTo(beatMarkersX[i], r_canvas.height);
		ctx.stroke();
	}
}

function drawthreshold(ctx){
	var amp = settings.amplitude,
		offY = settings.offsetY,
		y = offY + settings.threshold * amp;
	ctx.strokeStyle = "#0cc";
	ctx.beginPath();
	ctx.moveTo(0, y);
	ctx.lineTo(r_canvas.width, y);
	ctx.stroke();
}

function highlightNote(melodyIndex, harmonyIndex){
	console.log(melodyIndex,harmonyIndex)
	for (var i = 0, endi = pitchMarkers.length; i<endi; i++){
		pitchMarkers[i].classList.remove('highlight-melody');
		pitchMarkers[i].classList.remove('highlight-harmony');
	}

	console.log("harmonyIndex",(endi) - harmonyIndex, pitchMarkers.length)

	pitchMarkers[endi - harmonyIndex - 1].classList.add('highlight-harmony');
	pitchMarkers[endi - melodyIndex - 1].classList.add('highlight-melody');

}



/***************************************************/
// Framework
/***************************************************/

Array.add = function(){
	var output = new Array(arguments[0].length);
	for  (var j = 0, endj = arguments.length; j<endj; j++){
		var additive = arguments[j];
		for (var i = 0, endi = additive.length; i < endi; i++){
			output[i] = output[i] + additive[i] || additive[i] || output[i] || 0;
		}
	}
	return output;
}

function clamp(val, min, max){
	if (val < min) return min;
	if (val > max) return max;
	return val;
}
