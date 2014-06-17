define(function (require, exports, module){
	/***************************************************/
	// Sounds
	/***************************************************/

	this.audioPath = "sound/piano/";
	this.manifest = [];
	var octaveRange = 4;
	this.numNotes = 64;

	var scale = this.scale = [
		"a",
		"ab",
		"b",
		"c",
		"cd",
		"d",
		"de",
		"e",
		"f",
		"fg",
		"g",
		"ga"
	];

	var chords = this.chords = {
		"a": ["a","cd","e"],
		"b": ["b","de","fg"],
		"c": ["c","e","g"],
		"d": ["d","fg","a"],
		"e": ["e","ga","b"],
		"f": ["f","a","c"],
		"g": ["g","b","d"],

		"ab": ["ab","d","e"],
		"cd": ["cd","f","a"],
		"de": ["de","g","ab"],
		"fg": ["fg","ab","cd"],
		"ga": ["ga","c","de"],
		
		"am": ["a","c","e"],
		"bm": ["b","d","fg"],
		"cm": ["c","de","g"],
		"dm": ["d","f","a"],
		"em": ["g","e","b"],
		"fm": ["f","ga","c"],
		"gm": ["g","ab","d"],
		
		"abm": ["ab","cd","f"],
		"cdm": ["cd","e","ga"],
		"dem": ["de","fg","ab"],
		"fgm": ["fg","a","cd"],
		"gam": ["ga","b","de"],

		"a7": ["a","cd","e","ga"],
		"b7": ["b","de","fg","ab"],
		"c7": ["c","e","g","b"],
		"d7": ["d","fg","a","cd"],
		"e7": ["g","ef","b","a"],
		"f7": ["f","a","c","e"],
		"g7": ["g","b","d","fg"],
	};

	function minor(chord){

	}

	function seventh(chord){

	}

	var startOctave = 1;

	this.getNotesInChord = function(chordName){
		var notesInChord = [];
		var chord = chords[chordName];
		for (var octave = startOctave; octave < octaveRange + startOctave; octave++){
			for (var noteIndex = 0; noteIndex < chord.length; noteIndex++){
				notesInChord.push(chord[noteIndex] + octave);
			}
		}
		return notesInChord;
	}

	/*function generatePianoManifest(manifest){
		for (var i = 1; i < numNotes + 1; i++){
			var noteId = scale[(i - 1) % 12] + ((i / 12) >> 0);
			manifest.push({
				id: "piano" + noteId,
				src: "ff-" + pad(i,3) +".wav"
			})
		}
		return manifest;
	}*/

	function pad(num, minDigits){
		num = num.toString();
		while (num.length < minDigits){
			num = "0" + num;
		}
		return num;
	}

	return this;
});
 