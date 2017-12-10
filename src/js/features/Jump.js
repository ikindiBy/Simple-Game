import {Feature, Sides} from '../Entity.js';


export default class Jump extends Feature {
		constructor() {
			super('jump');

			this.duration = 0.5;
			this.velocity = 200;
			this.engageTime = 0;
			this.readyToJump = false;
		}

		start() {
			if (this.readyToJump) {
				this.engageTime = this.duration;
			}
		}

		cancel() {
			this.engageTime = 0;
		}

		obstruct(entity, side) {
			if (side === Sides.BOTTOM) {
				this.readyToJump = true;
			} else if (side === Sides.TOP) {
				this.cancel();
			}
			
		}

		update(entity, dT) {
			if (this.engageTime > 0) {
				entity.velocity.y = -this.velocity;
				this.engageTime -= dT;
			}

			this.readyToJump = false;
		}
	}  