import {Vector} from './mathematics.js';

	export default class Entity {
		constructor() {
			this.position = new Vector(0,0);
			this.velocity = new Vector(0,0);

			this.features = [];
		}

		addFeature(feature) {
			this.features.push(feature);
			this[feature.NAME] = feature; 
		}

		update(deltaTime) {
			this.features.forEach(feature => {
				feature.update(this, deltaTime);
			});
		}
	}

	export class Feature {
		constructor(name) {
			this.NAME = name;
		}

		update() {
			
		}
	}