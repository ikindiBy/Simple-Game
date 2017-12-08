import Compositor from './Compositor.js';
import {Matrix} from './mathematics.js';

export default class Level {
	constructor() {
		this.compos = new Compositor();
		this.entities = new Set();
		this.tiles = new Matrix();
	}

	update(deltaTime) {
		this.entities.forEach(entity => {
			entity.update(deltaTime);
		});	
	}
}