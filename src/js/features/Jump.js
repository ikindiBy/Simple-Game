import {Feature} from '../Entity.js';

export default class Jump extends Feature {
		constructor() {
			super('jump');

			this.duration = 0.5;
			this.velocity = 200;
			this.engageTime = 0;
		}

		start() {
			this.engageTime = this.duration;
		}

		cancel() {
			this.engageTime = 0;
		}

		update(entity, dT) {
			if (this.engageTime > 0) {
				entity.velocity.y = -this.velocity;
				this.engageTime -= dT;
			}
		}
	}  