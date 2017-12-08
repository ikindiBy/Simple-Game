import Level from './Level.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {loadBacgroundSprites} from './sprites.js';

export function loadImage(url) {
			return new Promise(resolve => {
				const img = new Image();
				img.src = url;
				img.addEventListener('load', () => {
					resolve(img);
				});
			});
		}

	export function loadDataFromJSON(nameFile) {
		console.log('loadDataFromJSON',nameFile);
		return fetch(`../src/database/${nameFile}.json`)
		.then(response => response.json());
	}

	export function loadLevel(nameFile) {
		console.log('loadDataFromJSON',nameFile);
		return Promise.all ([
			fetch(`../src/database/${nameFile}.json`)
			.then(response => response.json()),

			loadBacgroundSprites()
		]) 
		.then(([levelSpec, bacgroundSprites])  => {

			const level = new Level();

			let backgroundLayer = createBackgroundLayer(levelSpec.backgrounds, bacgroundSprites);
			level.compos.layers.push(backgroundLayer);

			let heroLayer = createSpriteLayer(level.entities);
			level.compos.layers.push(heroLayer);

			return level;
		})
	}


			