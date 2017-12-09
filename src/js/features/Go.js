import {Feature} from '../Entity.js';

export default class Go extends Feature {
		constructor() {
			super('go');
			this.direction = 0;
			this.speed = 6000;
		}

		start() {
			this.engageTime = this.duration;
		}

		cancel() {

		}

		update(entity, dT) {
			entity.velocity.x = this.speed * this.direction * dT;
		}
	}  