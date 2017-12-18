


export default class Sounds{ 
	constructor() {
		this.loadedSounds = new Map();
		this.loas = [];
	}

	playSound(name) {

		if (this.loadedSounds.has(name)) {

			this.loadedSounds.get(name).play();

		} else {

			let sound = new Audio (`sounds/${name}.mp3`);
			sound.load();
			sound.play();

			this.loadedSounds.set(name, sound);	
		}   
	}
}