// Entry file for js scripts

import SourceSprites from './SourceSprites.js';
import {loadImage, loadDataFromJSON} from './loaders.js';
import {loadBacgroundSprites, loadHeroSprites} from './sprites.js';
	
function drawBackground(backgrounOf, context, sprites) {
		backgrounOf.ranges.forEach(([x1, x2, y1, y2]) => {
			for(let x = x1; x < x2; x = x+37) {
				for(let y = y1; y<y2; y= y+37) {
				sprites.drawTile(backgrounOf.tile, context, x, y);	
			}
		}
	})
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
	.then(([hero, sprites, levelDataFromJSON]) => {
		levelDataFromJSON.backgrounds.forEach(background => {
		drawBackground(background, context, sprites);
		});

		hero.drawTile('boy3.png', context, 200, 520);
	})