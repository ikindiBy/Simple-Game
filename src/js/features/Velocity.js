import {Feature} from '../Entity.js';


export default class Velocity extends Feature {
		constructor() {
			super('velocityFeature');
		}

		update(entity, dT) {
			entity.position.x += entity.velocity.x * dT;
			entity.position.y += entity.velocity.y*dT;				
		}
	}