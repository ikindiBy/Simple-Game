// Entry file for js scripts

import SourceSprites from './SourceSprites.js';
import {loadImage, loadTilesFromJSON} from './loaders.js';

	// console.log('Go ahead!!!')

	
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
	// context.fillStyle = "orange";
	// context.fillRect(80,80,60,25);


	loadImage('../images/sprites.png')
	.then(image => {
		const sprites = new SourceSprites(image);

		loadTilesFromJSON('sprites')
		.then( fileJSON => {
			sprites.defineTilePerJSON(fileJSON, 'box-g.png');
			sprites.defineTilePerJSON(fileJSON, 'box-b1.png');

			loadTilesFromJSON('level-1')
			.then( fileJSON => {
				fileJSON.backgrounds.forEach(background => {
					drawBackground(background, context, sprites);
				})
			});
		});
	});
	
