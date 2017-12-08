import Entity from './Entity.js';
import {loadHeroSprites} from './sprites.js';
import Velocity  from './features/Velocity.js';
import Jump  from './features/Jump.js';

	export function createHero(){


		return loadHeroSprites()
		.then( sprite => {
			const hero = new Entity();

			hero.addFeature(new Velocity());
			hero.addFeature(new Jump());

			hero.draw = function drawHero(context) {
				
				sprite.drawTile('boy3.png', context, this.position.x, this.position.y);
			}
			return hero;
		});	
	}

	
