import Entity from './Entity.js';
import {loadHeroSprites} from './sprites.js';

	export function createHero(){
		return loadHeroSprites()
		.then( sprite => {
			let hero = new Entity();
			// hero.position.set(60,520);
			// hero.velocity.set(8, -15);

			hero.draw = function drawHero(context) {
				sprite.drawTile('boy3.png', context, this.position.x, this.position.y);
			}

			hero.update = function updateHero(dT) {
				this.position.x += this.velocity.x*dT;
				this.position.y += this.velocity.y*dT;			
			}
			return hero;
		});
			
	}
		