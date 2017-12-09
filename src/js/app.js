import TimeHandler from './TimeHandler.js';
import {loadLevel} from './loaders.js';
import {createHero} from './entities.js';
import KeyboardListener from './KeyboardListener.js';
import {createCollisionLayer} from './layers.js';
import {setupKeyboard} from './Input.js';

	const canvas = document.getElementById('canvas');
	canvas.setAttribute('width', 962);
	canvas.setAttribute('height', 629);
	const context = canvas.getContext('2d');

	Promise.all([
		createHero(),
		loadLevel('level-1')
		])
		.then(([hero, level]) => {

			hero.position.set(60, 100);
			level.entities.add(hero);

			let input = setupKeyboard(hero);
			input.listenTo(window);

			/* for normalize and unification time flying */
			let timer = new TimeHandler(1/60);
			timer.update = function update(deltaTime) {	
				level.update(deltaTime);
				level.compos.drawLayerWithContext(context);
			};
			timer.start();
		})




	

