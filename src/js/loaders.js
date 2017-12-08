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

			createTiles(level, levelSpec.backgrounds);

			let backgroundLayer = createBackgroundLayer(level, bacgroundSprites);
			// let backgroundLayer = createBackgroundLayer(levelSpec.backgrounds, bacgroundSprites);
			level.compos.layers.push(backgroundLayer);

			let heroLayer = createSpriteLayer(level.entities);
			level.compos.layers.push(heroLayer);

			console.table(level.tiles.grid);

			return level;
		})
	}

	function createTiles(level, backgrounds) {
		backgrounds.forEach(background => {
			background.ranges.forEach(([x1, x2, y1, y2]) => {
				for(let x = x1; x < x2; x = x+37) {
					for(let y = y1; y<y2; y= y+37) {
						level.tiles.set(x, y, {
							name: background.tile,
						})	
					}
				}
			})
		});
	}



			