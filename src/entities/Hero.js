import Entity from '../Entity.js';
import {loadHeroSprites} from '../sprites.js';
import Jump  from '../features/Jump.js';
import Go  from '../features/Go.js';
import {createAnimation} from '../animation.js';

	export function loadHero(){
		return loadHeroSprites()
		.then(createHeroFeactory);	
	}

	function createHeroFeactory(sprite) {

		let frames = ['boy4.png', 'boy3.png', 'boy2.png', 'boy1.png'];
		let runAnim = createAnimation(frames, 4);

		function routeFrame (hero) {
				if (!hero.jump.readyToJump) {
					return 'boy3.png';
				}
				if (hero.go.distance > 0) {
					return runAnim(hero.go.distance);
				}

				return 'boy1.png';
			}

		function drawHero(context) {
				sprite.drawTile(routeFrame(this), context, 0, 0, this.go.heading > 0);
			}

		return function createHero() {
			const hero = new Entity();
			hero.size.set(37, 50);
			
			hero.addFeature(new Jump());
			hero.addFeature(new Go());
			
			hero.draw = drawHero;

			return hero;
			}
	}