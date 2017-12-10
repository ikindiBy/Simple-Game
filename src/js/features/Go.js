import {Feature} from '../Entity.js';

export default class Go extends Feature {
		constructor() {
			super('go');
			this.direction = 0;
			this.speed = 10000;
			this.distance = 0;
			this.heading = 1;
		}

		// start() {
		// 	this.engageTime = this.duration;
		// }

		// cancel() {

		// }

		update(entity, dT) {
			entity.velocity.x = this.speed * this.direction * dT;
			if (this.direction) {
				this.heading = this.direction;
				this.distance += Math.abs(entity.velocity.x) * dT;
			} else {
				this.distance = 0;
			}
			
		}
	}  