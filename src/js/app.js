
import SourceSprites from './SourceSprites.js';
import Compositor from './Compositor.js';
import {Vector} from './mathematics.js';
import Entity from './Entity.js';
import TimeHandler from './TimeHandler.js';
import {loadDataFromJSON, loadLevel} from './loaders.js';
import {loadBacgroundSprites, loadHeroSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {createHero} from './entities.js';

import KeyboardListener from './KeyboardListener.js';

	const canvas = document.getElementById('canvas');
	canvas.setAttribute('width', 960);
	canvas.setAttribute('height', 640);
	const context = canvas.getContext('2d');

	Promise.all([
		createHero(),
		// loadBacgroundSprites(),
		loadLevel('level-1')
		// loadDataFromJSON('level-1')
		])
		.then(([hero, level]) => {
		// .then(([hero, bacgroundSprites, levelDataFromJSON]) => {
			
			const gravity = 5;  // for example   1000
			hero.position.set(60, 100);

			level.entities.add(hero);

			const SPACE = 32;
			let keyInput = new KeyboardListener();
			keyInput.addMapping(SPACE, keyState => {
				if(keyState) {
					hero.jump.start();
				} else {
					hero.jump.cancel();
				}
			});

			keyInput.listenTo(window);

			/* for normalize and unification time flying */
			let timer = new TimeHandler(1/60);
			timer.update = function update(deltaTime) {
				
				hero.update(deltaTime);
				level.compos.drawLayerWithContext(context);
				hero.velocity.y += gravity*deltaTime;
			};

			timer.start();

		})




	

