
import SourceSprites from './SourceSprites.js';
import Compositor from './Compositor.js';
import {Vector} from './mathematics.js';
import Entity from './Entity.js';
import TimeHandler from './TimeHandler.js';
import {loadDataFromJSON} from './loaders.js';
import {loadBacgroundSprites, loadHeroSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {createHero} from './entities.js';


	const canvas = document.getElementById('canvas');
	canvas.setAttribute('width', 960);
	canvas.setAttribute('height', 640);
	const context = canvas.getContext('2d');

	Promise.all([
		createHero(),
		loadBacgroundSprites(),
		loadDataFromJSON('level-1')
		])
		.then(([hero, bacgroundSprites, levelDataFromJSON]) => {

			let compos = new Compositor();

			let backgroundLayer = createBackgroundLayer(levelDataFromJSON.backgrounds, bacgroundSprites);
			compos.layers.push(backgroundLayer);

			const gravity = 10;  // for example
			hero.position.set(60, 520);
			hero.velocity.set(200, -500);

			let heroLayer = createSpriteLayer(hero);
			compos.layers.push(heroLayer);

			let timer = new TimeHandler(1/60);
			timer.update = function update(deltaTime) {
				compos.drawLayerWithContext(context);
				hero.update(deltaTime);
				hero.velocity.y += gravity;
			};

			timer.start();

		})




	

