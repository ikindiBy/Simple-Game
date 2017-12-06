import {Feature} from '../Entity.js';


export default class Velocity extends Feature {
		constructor() {
			super('velocity');
		}

		update(entity, dT) {

			console.log('hero',entity );

			entity.position.x += entity.velocity.x*dT;
			entity.position.y += entity.velocity.y*dT;			
		}
	}