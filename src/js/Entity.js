import {Vector} from './mathematics.js';

	export let Sides = {
		TOP: Symbol('top'),
		BOTTOM: Symbol('bottom'),
	}
	
	export class Feature {
		constructor(name) {
			this.NAME = name;
		}

		obstruct() {
		}

		update() {			
		}
	}
	
	export default class Entity {
		constructor() {
			this.position = new Vector(0,0);
			this.velocity = new Vector(0,0);
			this.size = new Vector(0,0);

			this.features = [];
		}

		addFeature(feature) {
			this.features.push(feature);
			this[feature.NAME] = feature; 
		}

		obstruct(side) {
			this.features.forEach(feature => {
				feature.obstruct(this, side);
			});
		}

		update(deltaTime) {
			this.features.forEach(feature => {
				feature.update(this, deltaTime);
			});
		}
	}

