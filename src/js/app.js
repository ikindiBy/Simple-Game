// Entry file for js scripts

import SourceSprites from './SourceSprites.js';
import {loadImage, loadDataFromJSON} from './loaders.js';

	
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

	loadImage('../images/sprites.png')
	.then(image => {
		const sprites = new SourceSprites(image);

		loadDataFromJSON('sprites')
		.then( fileJSON => {
			sprites.defineTilePerJSON(fileJSON, 'box-g.png');
			sprites.defineTilePerJSON(fileJSON, 'box-b1.png');

			loadDataFromJSON('level-1')
			.then( fileJSON => {
				fileJSON.backgrounds.forEach(background => {
					drawBackground(background, context, sprites);
				});
			});
		});
	});
	
