import Entity from './Entity.js';
import {loadHeroSprites} from './sprites.js';
import Jump  from './features/Jump.js';
import Go  from './features/Go.js';
import {createAnimation} from './animation.js';



	export function createHero(){

		return loadHeroSprites()
		.then( sprite => {
			const hero = new Entity();
			hero.size.set(37, 50);

			
			hero.addFeature(new Jump());
			hero.addFeature(new Go());

			let frames = ['boy4.png', 'boy3.png', 'boy2.png', 'boy1.png'];

			let runAnim = createAnimation(frames, 5);

			function routeFrame (hero) {
				if (!hero.jump.readyToJump) {
					return 'boy3.png';
				}
				// if (hero.go.direction !== 0) {
				if (hero.go.distance > 0) {
					return runAnim(hero.go.distance);
				}

				return 'boy1.png';
			}
			
			hero.draw = function drawHero(context) {
				sprite.drawTile(routeFrame(this), context, 0, 0, this.go.heading > 0);
			}

			return hero;
		});	
	}

	
