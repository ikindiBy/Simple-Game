import Entity, {Sides}  from '../Entity.js';
import {loadHeroSprites} from '../sprites.js';
import {createAnimation} from '../animation.js';

	export function loadPink(){
		return loadHeroSprites()
		.then(createPinkFeactory);	
	}

	function createPinkFeactory(sprite) {

		let frames = ['enemy-purple1.png', 'enemy-purple2.png'];
		let runAnim = createAnimation(frames, 5);

		function routeFrame(entity) {	
			return runAnim(entity.walk.distance);
		}

		function drawHero(context) {
			sprite.drawTile(routeFrame(this), context, 0, 0, this.walk.heading > 0);
		}

		return function createPink() {
			const pink = new Entity();
			pink.size.set(25, 15);
			pink.lifeTime = 0;	

			pink.addFeature({
				NAME: 'walk',
				speed: -40,
				distance: 0,
				heading : 1,

				obstruct(pink, side) {
					if (side === Sides.LEFT ||  side === Sides.RIGHT ){
						this.speed = -this.speed;
						this.heading = -this.heading ;
					}
				},
				update(pink, deltaTime) {
					pink.velocity.x = this.speed;
					pink.lifeTime += deltaTime;
					this.distance += Math.abs(pink.velocity.x)*deltaTime;
				}
			});
			
			pink.draw = drawHero;
			return pink;
		}
	}