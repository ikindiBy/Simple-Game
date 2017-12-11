import TimeHandler from './TimeHandler.js';
import {loadLevel} from './loaders.js';
import {loadHero} from './entities/Hero.js';
import {loadPink} from './entities/PinkHorror.js';
import KeyboardListener from './KeyboardListener.js';
// import {createCollisionLayer, createCmeralayer} from './layers.js';
import {createCollisionLayer} from './layers.js';
import {setupKeyboard} from './Input.js';
import {loadEntities} from './entities.js';
import Camera from './Camera.js';

// import {debugging} from './debuging.js';

	const canvas = document.getElementById('canvas');
	canvas.setAttribute('width', 962);
	canvas.setAttribute('height', 629);
	const context = canvas.getContext('2d');

	Promise.all([
		// loadHero(),
		// loadPink(),
		loadEntities(),
		loadLevel('level-1')
		])
		// .then(([createHero, createPink, level]) => {
		.then(([entity, level]) => {

			 console.log(		entity);

			let camera = new Camera();
			window.camera = camera;

			let hero = entity.hero();
			hero.position.set(60, 100);

			let pink = entity.pink();
			pink.position.set(300, 100);

			level.entities.add(hero);
			level.entities.add(pink);

			// level.compos.layers.push(
				// createCollisionLayer(level),
				// createCmeralayer(camera));

				// level.compos.layers.push(
				//  createCollisionLayer(level)
				// );

			let input = setupKeyboard(hero);
			input.listenTo(window);

			// debugging(canvas, hero, level, camera);

			/* for normalize and unification time flying */
			let timer = new TimeHandler(1/60);
			timer.update = function update(deltaTime) {	
				level.update(deltaTime);

				if (hero.position.x > 250) {
					camera.position.x = hero.position.x - 250;
				}

				level.compos.drawLayerWithContext(context, camera);
			};
			timer.start();
		})



	

