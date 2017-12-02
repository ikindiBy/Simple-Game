// Entry file for js scripts

import SourceSprites from './SourceSprites.js';
import {loadImage, loadTilesFromJSON} from './loaders.js';

	// console.log('Go ahead!!!')

	
// function drawBackground(backgrounTile, context, sprites) {
// 	let startX = backgrounTile["sky1.png"].frame.x;
// 	let startY = backgrounTile["sky1.png"].frame.x;
// 	let weightTile = backgrounTile["sky1.png"].frame.w;
// 	let weightTile = backgrounTile["sky1.png"].frame.h;

// }


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
			
			for(let x = 0; x<960; x = x+37) {
				sprites.drawTile('box-g.png', context, x, 640-137);	
			}
		} );
	});
	
