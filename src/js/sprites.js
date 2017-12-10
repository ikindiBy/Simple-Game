import SourceSprites from './SourceSprites.js';
import {loadImage, loadDataFromJSON} from './loaders.js';

export function loadBacgroundSprites() {
	return loadImage('../images/sprites.png')
	.then(image => {
		const sprites = new SourceSprites(image);
		return sprites ;
	})
	.then(sprites => {
		return loadDataFromJSON('sprites')
		.then( spritesDataFromJSON => {
			sprites.defineTilePerJSON(spritesDataFromJSON, 'box-g.png');
			sprites.defineTilePerJSON(spritesDataFromJSON, 'box-b1.png');
			return sprites;
		});
	});
}

export function loadHeroSprites() {
	return loadImage('../images/sprites.png')
	.then(image => {
		const sprites = new SourceSprites(image);
		return sprites ;
	})
	.then(sprites => {
		return loadDataFromJSON('sprites')
		.then(spritesDataFromJSON => {
			sprites.defineTilePerJSON(spritesDataFromJSON, 'boy3.png');
			sprites.defineTilePerJSON(spritesDataFromJSON, 'boy4.png');
			sprites.defineTilePerJSON(spritesDataFromJSON, 'boy1.png');
			sprites.defineTilePerJSON(spritesDataFromJSON, 'boy2.png');
			return sprites ;
		});
	});
}