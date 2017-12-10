import {Feature} from '../Entity.js';

export default class Go extends Feature {
		constructor() {
			super('go');
			this.direction = 0;
			// this.speed = 10000;

			this.acceleration = 500;
			this.deceleration = 350;
			this.dragFactor = 1/5000;


			this.distance = 0;
			this.heading = 1;
		}

		update(entity, dT) {
			let absX = Math.abs(entity.velocity.x);
		
			if (this.direction !== 0) {
				entity.velocity.x += this.acceleration * dT * this.direction;
				this.heading = this.direction;
				
			} else if (entity.velocity.x !== 0) {
				let decel = Math.min(absX, this.deceleration * dT);
				entity.velocity.x += entity.velocity.x > 0 ? -decel : decel;
					
			} else {
				this.distance = 0;
			}

			let drag = this.dragFactor * entity.velocity.x * absX;
			entity.velocity.x -= drag;

			this.distance += absX * dT;

/*
			entity.velocity.x = this.speed * this.direction * dT;
			if (this.direction) {
				this.heading = this.direction;
				this.distance += Math.abs(entity.velocity.x) * dT;
			} else {
				this.distance = 0;
			}
			*/
			
		}
	}  