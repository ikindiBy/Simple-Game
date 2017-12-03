
import SourceSprites from './SourceSprites.js';
import Compositor from './Compositor.js';
import {loadDataFromJSON} from './loaders.js';
import {loadBacgroundSprites, loadHeroSprites} from './sprites.js';
import {createBackgroundLayer} from './layers.js';

	function createSpriteLayer(sprite, position) {
		return function drawSpriteLayer(context) {
			sprite.drawTile('boy3.png', context, position.x, position.y);
		}
	}


	const canvas = document.getElementById('canvas');
	canvas.setAttribute('width', 960);
	canvas.setAttribute('height', 640);

	const context = canvas.getContext('2d');


/*   //first version of drawing bgc!
loadImage('../images/sprites.png')
	.then(image => {
		const sprites = new SourceSprites(image);

		loadDataFromJSON('sprites')
		.then( spritesDataFromJSON => {
			sprites.defineTilePerJSON(spritesDataFromJSON, 'box-g.png');
			sprites.defineTilePerJSON(spritesDataFromJSON, 'box-b1.png');

			loadDataFromJSON('level-1')
			.then( levelDataFromJSON => {
				levelDataFromJSON.backgrounds.forEach(background => {
					drawBackground(background, context, sprites);
				});
			});
		});
	});
	*/

Promise.all([
	loadHeroSprites(),
	loadBacgroundSprites(),
	loadDataFromJSON('level-1')
	])
	.then(([heroSprite, bacgroundSprites, levelDataFromJSON]) => {
		
		let pos = {x:200, y: 520};  // for example

		let compos = new Compositor();

		let backgroundLayer = createBackgroundLayer(levelDataFromJSON.backgrounds, bacgroundSprites);
		compos.layers.push(backgroundLayer);

		let heroLayer = createSpriteLayer(heroSprite, pos);
		compos.layers.push(heroLayer);

		function update() {
			compos.drawLayerWithContext(context);
			pos.x += 2;
			pos.y -= 1;
			requestAnimationFrame(update);
		}

		 update();
	})

	

