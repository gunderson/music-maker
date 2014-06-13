var songs = {
	"waltz": {
		tempo: 200,
		bassFrequency: 6, // play the root of the chord every x beats
		changeRate: 6, // move to the next change every x beats
		// changes: ["c","c","f","f","g","g","e","e","f","f","f","f","g","g","c","c"],
		// changes: ["am","am","g","g","f","f","f","g"],	
		// 	],
		changes: [
			"dm","dm",   "g","g",
			"g","c",   "f","f",

			"dm","dm",   "g","g",
			"g","c",   "e","e",

			"am","am",   "g","g",
			"g","c",   "f","f",

			"am","am",   "g","g",
			"g","c",   "f","f",

			"am","am",   "g","g",
			"g","c",   "f","f",

			"am","am",   "g","g",
			"g","c",   "e","e",
			],
		voices : [
		{
			instrument: "piano",
			sustainable: true,
			threshold: 0.15, // peaks above this level in the rhythm cycle signal a note
			cycles: {
				rhythmCycles : new CycleGroup([
					new Cycle({
						rate: 1,
						scale: 1
					}),
					new Cycle({
						rate: 0.33333,
						scale: 1
					}),
					new Cycle({
						rate: 1/6,
						scale: 0.7
					}),
					new Cycle({
						rate: 1/24,
						scale: 0.7
					})/**/
				]),
				pitchCycles: new CycleGroup([
					new Cycle({
						rate: 0.8,
						scale: 1
					}),
					new Cycle({
						rate: 2,
						scale: 2
					}),
					new Cycle({
						rate: 4,
						scale: 0.5
					}),
					new Cycle({
						rate: 12,
						scale: 0
					})
				]),
				harmonyCycles:  new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				]),
				dyanmicCycles: new CycleGroup([
					new Cycle({
						rate: 1/32,
						scale: 0.5
					}),
					new Cycle({
						rate: 1/1024,
						scale: 0.5
					}),
					new Cycle({
						rate: 1/12,
						scale: 1
					})
				]),
				durationCycles: new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				])
			}
		},
		{
			instrument: "glockenspiel",
			sustainable: false,
			threshold: 0.20, // peaks above this level in the rhythm cycle signal a note
			cycles: {
				rhythmCycles : new CycleGroup([
					new Cycle({
						rate: 1,
						scale: 1
					}),
					new Cycle({
						rate: 2,
						scale: 1
					}),
					new Cycle({
						rate: 3,
						scale: 0.2
					}),
					new Cycle({
						rate: 1/6,
						scale: 0
					}),
					new Cycle({
						rate: 1/24,
						scale: -1
					}),
					new Cycle({
						rate: 1/32,
						scale: -1
					})
				]),
				pitchCycles: new CycleGroup([
					new Cycle({
						rate: 0.8,
						scale: 1
					}),
					new Cycle({
						rate: 1.2,
						scale: 2
					}),
					new Cycle({
						rate: 1/4,
						scale: 0.5
					}),
					new Cycle({
						rate: 1/16,
						scale: 0
					})
				]),
				harmonyCycles:  new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				]),
				dyanmicCycles: new CycleGroup([
					new Cycle({
						rate: 1/32,
						scale: 1
					}),
					new Cycle({
						rate: 1/1024,
						scale: 0.5
					}),
					new Cycle({
						rate: 1/12,
						scale: 1
					})
				]),
				durationCycles: new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				])
			}
		},
		{
			instrument: "pizzicato",
			sustainable: false,
			threshold: 0.10, // peaks above this level in the rhythm cycle signal a note
			cycles: {
				rhythmCycles : new CycleGroup([
					new Cycle({
						rate: 1,
						scale: 1
					}),
					new Cycle({
						rate: 2,
						scale: 1
					}),
					new Cycle({
						rate: 1/6,
						scale: 0
					}),
					new Cycle({
						rate: 1/24,
						scale: -0.5
					}),
					new Cycle({
						rate: 1/32,
						scale: -0.5
					})
				]),
				pitchCycles: new CycleGroup([
					new Cycle({
						rate: 1,
						scale: 1
					}),
					new Cycle({
						rate: 1/4,
						scale: 0.5
					}),
					new Cycle({
						rate: 1/16,
						scale: 0
					})
				]),
				harmonyCycles:  new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				]),
				dyanmicCycles: new CycleGroup([
					new Cycle({
						rate: 1/32,
						scale: 1
					}),
					new Cycle({
						rate: 1/1024,
						scale: 0.5
					}),
					new Cycle({
						rate: 1/12,
						scale: 1
					})
				]),
				durationCycles: new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				])
			}
		}]
	},
	"demo": {
		tempo: 60,
		bassFrequency: 8, // play the root of the chord every x beats
		changeRate: 4, // move to the next change every x beats
		// changes: ["c","c","f","f","g","g","e","e","f","f","f","f","g","g","c","c"],
		// changes: ["am","am","g","g","f","f","f","g"],	
		// 	],
		changes: [
			"dm","dm",   "g","g",
			"g","c",   "f","f",

			"dm","dm",   "g","g",
			"g","c",   "e","e",

			"am","am",   "g","g",
			"g","c",   "f","f",

			"am","am",   "g","g",
			"g","c",   "f","f",

			"am","am",   "g","g",
			"g","c",   "f","f",

			"am","am",   "g","g",
			"g","c",   "e","e",
			],
		voices : [
		{
			instrument: "piano",
			sustainable: true,
			threshold: 0.15, // peaks above this level in the rhythm cycle signal a note
			cycles: {
				rhythmCycles : new CycleGroup([
					new Cycle({
						rate: 1,
						scale: 1
					}),
					new Cycle({
						rate: 2,
						scale: 0
					}),
					new Cycle({
						rate: 1/4,
						scale: 0
					}),
					new Cycle({
						rate: 1/32,
						scale: 0
					})/**/
				]),
				pitchCycles: new CycleGroup([
					new Cycle({
						rate: 0.8,
						scale: 1
					}),
					new Cycle({
						rate: 2.12,
						scale: 1
					})
				]),
				harmonyCycles:  new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0
					}),
					new Cycle({
						rate: 2.7,
						scale: 0
					})
				]),
				dyanmicCycles: new CycleGroup([
					new Cycle({
						rate: 1/32,
						scale: 0.5
					}),
					new Cycle({
						rate: 1/1024,
						scale: 0.5
					}),
					new Cycle({
						rate: 1/12,
						scale: 1
					})
				]),
				durationCycles: new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				])
			}
		}]
	},




	/*
	"stairway": {
		tempo: 150,
		threshold: 0.25,
		bassFrequency: 1,
		changeRate: 2,
		changes: ["am","am","g","g","f","f","f","g"],	
		voices : [{
			instrument: "piano",
			threshold: 0.25,
			cycles: {
				rhythmCycles : (function(){
					var c = [
						{
							rate: 1,
							scale: 1,
							buffer: []
						},
						{
							rate: 2,
							scale: 2,
							buffer: []
						},
						{
							rate: 0.625,
							scale: 0,
							buffer: []
						},
						{
							rate: 1/4,
							scale: 1,
							buffer: []
						},
						{
							rate: 1/12,
							scale: 1.3,
							buffer: []
						}
					];
					c.buffer = [];
					return c;
				})(),
				pitchCycles: (function (){
					var c = [{
						rate: 0.8,
						scale: 1,
						buffer: []
					},
					{
						rate: 0.31,
						scale: 2,
						buffer: []
					},
					{
						rate: 4,
						scale: 0,
						buffer: []
					},
					{
						rate: 12,
						scale: 0,
						buffer: []
					}];
					c.buffer = [];
					return c;
				})(),
				harmonyCycles:  new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				]),
				dyanmicCycles: new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				]),
				durationCycles: new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				])
			}
		}]
	},
	"submarine": {
		tempo: 160,
		bassFrequency: 4,
		changeRate: 2,
		// changes: ["f","f","f","f","em","em","a","a","dm","dm","dm","dm"],
		changes: ["c","c","c","ab","f","f","f","dm","gm","gm","gm","f"],
		voices : [{
			instrument: "piano",
			threshold: 0.25,
			cycles: {
				rhythmCycles : (function(){
					var c = [
						{
							rate: 1,
							scale: 1,
							buffer: []
						},
						{
							rate: 2,
							scale: 1.2,
							buffer: []
						},
						{
							rate: 1/4,
							scale: 1.2,
							buffer: []
						},
						{
							rate: 1/12,
							scale: 0.6,
							buffer: []
						}
					];
					c.buffer = [];
					return c;
				})(),
				pitchCycles: (function (){
					var c = [{
						rate: 0.4,
						scale: 1,
						buffer: []
					},
					{
						rate: 1/4,
						scale: 1,
						buffer: []
					},
					{
						rate: 1/16,
						scale: 1,
						buffer: []
					}];
					c.buffer = [];
					return c;
				})(),
				harmonyCycles:  new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				]),
				dyanmicCycles: new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				]),
				durationCycles: new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				])
			}
		}]
	},
	"sia": {
		tempo: 180,
		bassFrequency: 4,
		changeRate: 4,
		// changes: ["f","f","f","f","em","em","a","a","dm","dm","dm","dm"],
		// changes: [
		// 	"cd","cd",   "cd","cd",
		// 	"cd","cd",   "abm","abm",

		// 	"abm","abm",  "fg","fg",
		// 	"fg","fg",    "dem", "fg",

		// 	"abm","abm",  "cd","cd",
		// 	"abm","abm",  "abm","cd",

		// 	"abm","cd",  "cd","fg",
		// 	"fg","fg",   "abm","fg"
		// 	],
		changes: [
			"dm","dm",   "g","g",
			"g","c",   "f","f",

			"dm","dm",   "g","g",
			"g","c",   "e","e",

			"am","am",   "g","g",
			"g","c",   "f","f",

			"am","am",   "g","g",
			"g","c",   "f","f",

			"am","am",   "g","g",
			"g","c",   "f","f",

			"am","am",   "g","g",
			"g","c",   "e","e",
			],
		voices : [{
			instrument: "piano",
			threshold: 0.05,
			cycles: {
				rhythmCycles : (function(){
					var c = [
						{
							rate: 1,
							scale: 1,
							buffer: []
						},
						{
							rate: 2,
							scale: 1.2,
							buffer: []
						},
						{
							rate: 1/4,
							scale: 0.8,
							buffer: []
						},
						{
							rate: 1/32,
							scale: 1,
							buffer: []
						}
					];
					c.buffer = [];
					return c;
				})(),
				pitchCycles: (function (){
					var c = [{
						rate: 0.5,
						scale: 1,
						buffer: []
					},
					{
						rate: 0.25,
						scale: 1,
						buffer: []
					},
					{
						rate: 1/16,
						scale: 1,
						buffer: []
					}];
					c.buffer = [];
					return c;
				})(),
				harmonyCycles:  new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				]),
				dyanmicCycles: new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				]),
				durationCycles: new CycleGroup([
					new Cycle({
						rate: 1.2,
						scale: 0.3
					}),
					new Cycle({
						rate: 2.7,
						scale: 0.27
					})
				])
			}
		}]
	}*/
}

var beatCycle = new CycleGroup([
					new Cycle({
						rate: 1,
						scale: 1
					})
				]);

function Cycle(options){
	this.rate = 1;
	this.scale = 1;
	this.noBuffer = false;
	this.buffer = [];

	for (key in options){
		this[key] = options[key];
	}

	return this;
}

function CycleGroup(cycles, options){
	var group = cycles || [];
	group.buffer = [];

	for (key in options){
		group[key] = options[key];
	}

	return group;
}