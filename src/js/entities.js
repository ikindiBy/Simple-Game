import Entity from './Entity.js';
import {loadHeroSprites} from './sprites.js';
import Velocity  from './features/Velocity.js';
import Jump  from './features/Jump.js';
import Go  from './features/Go.js';

	export function createHero(){


		return loadHeroSprites()
		.then( sprite => {
			const hero = new Entity();
			hero.size.set(37, 50);

			
			hero.addFeature(new Jump());
			hero.addFeature(new Go());
			// hero.addFeature(new Velocity());
			
			hero.draw = function drawHero(context) {
				sprite.drawTile('boy3.png', context, 0, 0);
				// sprite.drawTile('boy3.png', context, this.position.x, this.position.y);
			}

			return hero;
		});	
	}

	
