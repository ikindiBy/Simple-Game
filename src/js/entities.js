import Entity, {Feature} from './Entity.js';
import {loadHeroSprites} from './sprites.js';
import Velocity  from './features/Velocity.js';
import Jump  from './features/Jump.js';

	export function createHero(){
		return loadHeroSprites()
		.then( sprite => {
			let hero = new Entity();
			hero.position.set(60,520);
			// hero.velocity.set(8, -15);
			// hero.velocity.set(300, -800);

			hero.addFeature(new Velocity());
			hero.addFeature(new Jump());

			hero.draw = function drawHero(context) {
				sprite.drawTile('boy3.png', context, this.position.x, this.position.y);
			}
			console.log(hero);

			return hero;
		});	
	}

	
