import TimeHandler from './TimeHandler.js';
import {loadLevel} from './loaders.js';
import {createHero} from './entities.js';
import KeyboardListener from './KeyboardListener.js';
import {createCollisionLayer, createCmeralayer} from './layers.js';
import {setupKeyboard} from './Input.js';
import Camera from './Camera.js';

import {debugging} from './debuging.js';

	const canvas = document.getElementById('canvas');
	canvas.setAttribute('width', 962);
	canvas.setAttribute('height', 629);
	const context = canvas.getContext('2d');

	Promise.all([
		createHero(),
		loadLevel('level-1')
		])
		.then(([hero, level]) => {

			let camera = new Camera();
			window.camera = camera;

			hero.position.set(60, 100);
			level.entities.add(hero);

			level.compos.layers.push(
				// createCollisionLayer(level),
				createCmeralayer(camera));

			let input = setupKeyboard(hero);
			input.listenTo(window);

			debugging(canvas, hero, level, camera);

			/* for normalize and unification time flying */
			let timer = new TimeHandler(1/60);
			timer.update = function update(deltaTime) {	
				level.update(deltaTime);
				level.compos.drawLayerWithContext(context, camera);
			};
			timer.start();
		})



	

