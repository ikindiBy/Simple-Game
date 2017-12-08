import Compositor from './Compositor.js';

export default class Level {
	constructor() {
		this.compos = new Compositor();
		this.entities = new Set();
	}

	update(deltaTime) {
		this.entities.forEach(entity => {
			entity.update(deltaTime);
		});	
	}
}