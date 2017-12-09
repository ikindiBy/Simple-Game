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

	function loadJSON(url) {
		return fetch(url)
		.then(response => response.json());
	}

	export function loadDataFromJSON(nameFile) {
		return loadJSON(`../src/database/${nameFile}.json`);	
	}

	export function loadLevel(nameFile) {
		console.log('loadLevel',nameFile);
		return Promise.all ([
			loadJSON(`../src/database/${nameFile}.json`),
			loadBacgroundSprites()
		]) 
		.then(([levelSpec, bacgroundSprites])  => {

			const level = new Level();

			createTiles(level, levelSpec.backgrounds);

			let backgroundLayer = createBackgroundLayer(level, bacgroundSprites);
			level.compos.layers.push(backgroundLayer);

			let heroLayer = createSpriteLayer(level.entities);
			level.compos.layers.push(heroLayer);

			return level;
		})
	}

	function createTiles(level, backgrounds) {
		function applyRange(background, xStart, xAmount, yStart, yAmount) {
			let xFrom = 37 * xStart;
			let xTill = xFrom + 37 * xAmount;
			let yFrom = 37 * yStart;
			let yTill = yFrom + 37 * yAmount;
			for(let x = xFrom; x < xTill; x = x + 37) {
				for(let y = yFrom; y < yTill; y = y + 37) {
					level.tiles.set(x, y, {
						name: background.tile,
						description: background.description,
					});	
				}
			}
		}

		console.log('createTiles');
		backgrounds.forEach(background => {
			background.ranges.forEach(range => {
				if (range.length === 4) {
					let [xStart, xAmount, yStart, yAmount] = range;
					applyRange(background, xStart, xAmount, yStart, yAmount);
				} else if (range.length === 2) {
					let [xStart, yStart] = range;
					applyRange(background, xStart, 1, yStart, 1);
				}
			});
		});
	}


			