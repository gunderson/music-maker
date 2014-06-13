/***************************************************/
// Infrastructure
/***************************************************/

Math.TAU = Math.PI * 2;

var r_canvas = document.querySelector("#r_canvas");
var r_ctx = r_canvas.getContext("2d");
var p_canvas = document.querySelector("#p_canvas");
var p_ctx = p_canvas.getContext("2d");
var v_canvas = document.querySelector("#v_canvas");
var v_ctx = v_canvas.getContext("2d");
var d_canvas = document.querySelector("#d_canvas");
var d_ctx = d_canvas.getContext("2d");

var loopFrameId = false;
var frameCount = 0;

var octaveRange = 4;
var noteIds = [];
var lastChord = "";

var beatRate;

var chordIndex = 0;

var loadedFiles = 0;

var settings = {};
var startTime = 0;

function setup(){

	settings = {
		offsetY: r_canvas.offsetHeight >> 1,
		amplitude: -r_canvas.offsetHeight >> 2,
		speedX: 3, // px/frame
		threshold: 0.1,
		bassFrequency: 2
	};

	Klang.init("http://klangfiles.s3.amazonaws.com/uploads/projects/l1Aoa/config.json", function() {
		changeSong('waltz');
		play();
		beat();
		onResize();
	});
	window.onresize = onResize;
}


function loop(){
	update();
	draw();
	playNotes();

	loopFrameId = requestAnimationFrame(loop);
}

function play(){
	startTime = Klang.context.currentTime;
	if(!loopFrameId) {
		loopFrameId = requestAnimationFrame(loop);
	}
}

function stop(){
	cancelAnimationFrame(loopFrameId);
	loopFrameId = false;
	metronomeId = false;
	Klang.triggerEvent("stop");
}
function stringToMidi(string) {
	var scale = [
		"c",
		"cd",
		"d",
		"de",
		"e",
		"f",
		"fg",
		"g",
		"ga",
		"a",
		"ab",
		"b",
	];
	var octave = parseInt(string.charAt(string.length-1));
	var note = string.split(octave)[0];
    var midiNoteNumber = scale.indexOf(note) + (octave*12);
    return midiNoteNumber;
}
// var notesToPlay = []
function update(){
	frameCount++;

	
	shiftCycle(beatCycle);

	// For each voice in the song
	for (var voiceIndex = 0, endVoiceIndex = currentSong.voices.length; voiceIndex < endVoiceIndex; voiceIndex++){
		var voice = currentSong.voices[voiceIndex];

		shiftCycle(voice.cycles.rhythmCycles);
		shiftCycle(voice.cycles.pitchCycles);
		shiftCycle(voice.cycles.harmonyCycles);
		shiftCycle(voice.cycles.dyanmicCycles);
		shiftCycle(voice.cycles.durationCycles);


		voice.notesToPlay = []

		if (inflection(voice.cycles.rhythmCycles.buffer) === -1 &&
			voice.cycles.rhythmCycles.buffer[0] >= settings.threshold){
			var notes;
			var melodyIndex = 0.5 * (1 + voice.cycles.pitchCycles.buffer[0]);
			melodyIndex = (melodyIndex * noteIds.length) >> 0;
			melodyIndex = clamp(melodyIndex, 0, noteIds.length - 1);

			var harmonyIndex = 0.5 * (1 + voice.cycles.pitchCycles.buffer[0] + voice.cycles.harmonyCycles.buffer[0]);
			harmonyIndex = (harmonyIndex * noteIds.length) >> 0;
			harmonyIndex = clamp(harmonyIndex, 0, noteIds.length - 1);

			highlightNote(voice, melodyIndex,harmonyIndex);

			var dynamicIndex = clamp(0.5 * (1 + voice.cycles.dyanmicCycles.buffer[0] + voice.cycles.dyanmicCycles.buffer[0]),0,1);

			addNote(voice, noteIds[melodyIndex],{
				volume: 1 * dynamicIndex
			});
			addNote(voice, noteIds[harmonyIndex],{
				volume: 0.5 * dynamicIndex
			});
			// if (voice.notesToPlay.indexOf(noteIds[melodyIndex]) === -1) voice.notesToPlay.push(noteIds[melodyIndex]);
			// if (voice.notesToPlay.indexOf(noteIds[harmonyIndex]) === -1) voice.notesToPlay.push(noteIds[harmonyIndex]);
		}
	}	
}

function draw(){
	moveBeatMarkersX();
	
	if (inflection(beatCycle[0].buffer) === -1){
		beat();
	}
	
	// clear canvases hack
	r_canvas.height = r_canvas.height;
	p_canvas.height = p_canvas.height;
	d_canvas.height = d_canvas.height;
	v_canvas.height = v_canvas.height;



	for (var voiceIndex = 0, endVoiceIndex = currentSong.voices.length; voiceIndex < endVoiceIndex; voiceIndex++){
		var voice = currentSong.voices[voiceIndex];
		drawBeats(r_ctx);
		drawBeats(p_ctx);
		drawBeats(d_ctx);
		drawBeats(v_ctx);
		drawComposite(r_ctx, voice.cycles.rhythmCycles.buffer);

		drawComposite(p_ctx, Array.add(voice.cycles.pitchCycles.buffer, voice.cycles.harmonyCycles.buffer), "#088");
		drawComposite(p_ctx, voice.cycles.pitchCycles.buffer);
		drawComposite(d_ctx, voice.cycles.durationCycles.buffer);
		drawComposite(v_ctx, voice.cycles.dyanmicCycles.buffer);

		drawthreshold(r_ctx);
		drawthreshold(r_ctx);
	}
}

function playNotes(){

	for (var voiceIndex = 0, endVoiceIndex = currentSong.voices.length; voiceIndex < endVoiceIndex; voiceIndex++){
		var voice = currentSong.voices[voiceIndex];
		for (var i = 0, endi = voice.notesToPlay.length; i < endi; i++){
			var note = voice.notesToPlay[i];

			/*createjs.Sound.play(voice.instrument + note.noteId, {
				volume: note.volume,
				startTime: 0,
				duration: note.duration * beatTime
			});*/
			//var nextBeatTime = beatTime/1000 -(Klang.context.currentTime-startTime) % (beatTime/1000);
			Klang.triggerEvent("piano_play", stringToMidi(note.noteId), note.volume);
			Klang.triggerEvent("piano_stop", stringToMidi(note.noteId), note.duration * beatTime/1000);
			Klang.triggerEvent("glockenspiel", stringToMidi(note.noteId), note.volume);
			Klang.triggerEvent("pizzicato", stringToMidi(note.noteId), note.volume);
			Klang.triggerEvent("strings_volume", note.volume);
			
			lastBeatTime = Klang.context.currentTime;
		}
	}
}

function addNote(voice, noteId, options){
	options = options || {};
	var note = {
			noteId: noteId,
			duration: options.duration || 2, // beats
			volume: (options.volume >= 0) ? options.volume : 1
		}

	if (voice.notesToPlay.indexOf(noteId) === -1){
		voice.notesToPlay.push(note)
	}
	/*
	if (voice.notesToPlay.indexOf(stringToMidi(noteIds[melodyIndex])) === -1){
		voice.notesToPlay.push(stringToMidi(noteIds[melodyIndex]));
	}
	*/
}


function onSoundsLoad(event) {
	if (++loadedFiles >= numNotes){
    	setup();
	}
}

function onResize(){
	p_canvas.height = p_canvas.parentNode.offsetHeight;
	p_canvas.width = p_canvas.parentNode.offsetWidth;
	r_canvas.height = p_canvas.parentNode.offsetHeight;
	r_canvas.width = p_canvas.parentNode.offsetWidth;
	v_canvas.height = p_canvas.parentNode.offsetHeight;
	v_canvas.width = p_canvas.parentNode.offsetWidth;
	d_canvas.height = p_canvas.parentNode.offsetHeight;
	d_canvas.width = p_canvas.parentNode.offsetWidth;

	settings.offsetY = r_canvas.height >> 1;
	settings.amplitude = -r_canvas.height >> 2;

	for (var voiceIndex = 0, endVoiceIndex = currentSong.voices.length; voiceIndex < endVoiceIndex; voiceIndex++){
		var voice = currentSong.voices[voiceIndex];
		scalePitchMarkers(voice);
		scaleDurationMarkers(voice);
	}
}

/***************************************************/
// APPLICATION
/***************************************************/

var beatMarkersX = [];
var pitchMarkers = [];
var durationMarkers = [];
var numBeats = 0;

var currentSong;

var changes;


function changeSong(songName){
	startTime = Klang.context.currentTime;
	frameCount = 0;
	changeTempo(songs[songName].tempo);
	currentSong = songs[songName];
	changes = songs[songName].changes;
	// noteIds = getNotesInChord(changes[0]);
	chordIndex = -1;

	settings.threshold = songs[songName].threshold;
	settings.bassFrequency = songs[songName].bassFrequency;
	settings.changeRate = songs[songName].changeRate;

	for (var voiceIndex = 0, endVoiceIndex = currentSong.voices.length; voiceIndex < endVoiceIndex; voiceIndex++){
		var voice = currentSong.voices[voiceIndex];
		makeDurationMarkers(voice, 5);
		scaleDurationMarkers(voice);
	}

	changeChord();

	console.log(songs[songName])
}

var beatTime = 0;
function changeTempo(tempo){
	var bpm = tempo;
	//time between beats
	beatTime = 60000 / bpm;
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
	for (var voiceIndex = 0, endVoiceIndex = currentSong.voices.length; voiceIndex < endVoiceIndex; voiceIndex++){
		var voice = currentSong.voices[voiceIndex];
		makePitchMarkers(voice, noteIds.length);
		scalePitchMarkers(voice);
	}
	if (changes[chordIndex] != lastChord ) {
		Klang.triggerEvent("violins_stop");
		for (var i = 0; i< noteIds.length; i++) {
			if (i > 8) {
				var note = stringToMidi(noteIds[i]);
				Klang.triggerEvent("violins_play", note);
			}
		}
	}
	Klang.triggerEvent("bass", stringToMidi(noteIds[0]));
	lastChord = changes[chordIndex];
}

function makePitchMarkers(voice, num){
	
	var container = document.querySelector('#pitch-markers');
	container.innerHTML = "";
	var pitchMarkers = voice.pitchMarkers = [];
	for (var i = 0; i < num; i++){
		var pitchMarker = document.createElement("div");
		pitchMarker.classList.add('pitch-marker');
		container.appendChild(pitchMarker);
		pitchMarkers.push(pitchMarker);
	}
}

function scalePitchMarkers(voice){
	var container = document.querySelector('#pitch-markers');
	for (var i = 0, endi = voice.pitchMarkers.length; i < endi; i++){
		voice.pitchMarkers[i].style.height = ((container.offsetHeight / endi) - 1) + "px";
	}
}
function makeDurationMarkers(voice, num){
	
	var container = document.querySelector('#duration-markers');
	container.innerHTML = "";
	var durationMarkers = voice.durationMarkers = [];
	for (var i = 0; i < num; i++){
		var durationMarker = document.createElement("div");
		durationMarker.classList.add('duration-marker');
		container.appendChild(durationMarker);
		durationMarkers.push(durationMarker);
	}
}

function scaleDurationMarkers(voice){
	var container = document.querySelector('#duration-markers');
	for (var i = 0, endi = voice.durationMarkers.length; i < endi; i++){
		voice.durationMarkers[i].style.height = ((container.offsetHeight / endi) - 1) + "px";
	}
}

function shiftCycle(cycle){
	var cycleValue = composeCycles(cycle);
	var maxBufferLength = r_canvas.offsetWidth / settings.speedX;
	if (cycle.buffer.length >= maxBufferLength || cycle.noBuffer === true){
		cycle.buffer.pop();
	}
	cycle.buffer.unshift(cycleValue);	
	return cycleValue;
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
	return cycles.map(function(obj){
			//magic math here
			if (obj.buffer.length >= maxBufferLength || obj.noBuffer === true){
				obj.buffer.pop();
			}
			obj.buffer.unshift(Math.cos(frameCount * obj.rate * beatRate) * obj.scale);
			return obj.buffer[0];
		}).mean();
}
var lastBeatTime;
function beat(){
	
	++numBeats;
	beatMarkersX.unshift(settings.speedX / 2);
	if (beatMarkersX[0] > r_canvas.width) beatMarkersX.pop();
	if (numBeats % settings.changeRate === 0) changeChord();

	var bassNote = changes[chordIndex].substr(0,1) + 0

	if (numBeats % settings.bassFrequency === 0) {
		addNote(currentSong.voices[0], bassNote);
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

function highlightNote(voice, melodyIndex, harmonyIndex){
	// console.log(melodyIndex,harmonyIndex)
	var pitchMarkers = voice.pitchMarkers;
	for (var i = 0, endi = pitchMarkers.length; i<endi; i++){
		pitchMarkers[i].classList.remove('highlight-melody');
		pitchMarkers[i].classList.remove('highlight-harmony');
	}

	// console.log("harmonyIndex",(endi) - harmonyIndex, pitchMarkers.length)

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

Array.prototype.sum = function(){
	var sum = 0;
	for (var i = 0, endi = this.length; i < endi; i++){
		sum += this[i];
	}
	return sum;
}

Array.prototype.mean = function(){
	return this.sum() / this.length;
}

function clamp(val, min, max){
	if (val < min) return min;
	if (val > max) return max;
	return val;
}
