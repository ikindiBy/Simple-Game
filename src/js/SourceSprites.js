import {loadTilesFromJSON} from './loaders.js';


export default class SourceSprites {
	constructor(image) {
		this.image = image;
		this.widthOfTile ;
		this.heightOfTile ; 
		this.tilesMap = new Map();
		this.startOfTileX ;
		this.startOfTileY ;
	}

	defineTilePerJSON(fileJSON, nameTile) {
		let buffers = [false, true].map(flip => {

			this.getCoordinatesOfTileFromJSON(fileJSON, nameTile);
			const bufferForTile = document.createElement('canvas');
			bufferForTile.width = this.widthOfTile;
			bufferForTile.height = this.heightOfTile;
			const bufferContext = bufferForTile.getContext('2d');

			if (nameTile.includes('boy') && flip) {
				bufferContext.scale(-1, 1);
				bufferContext.translate(-this.widthOfTile, 0);
			}

			if (nameTile.includes('enemy') && flip) {
				bufferContext.scale(-1, 1);
				bufferContext.translate(-this.widthOfTile, 0);
			}

			bufferContext.drawImage(
				this.image,
				this.startOfTileX,
				this.startOfTileY,
				this.widthOfTile,
				this.heightOfTile,
				0,
				0,
				this.widthOfTile,
				this.heightOfTile);

			return bufferForTile;
		});

			this.tilesMap.set(nameTile, buffers);
	}

	drawTile(nameTile, context, x, y, flip = false) {
			const buffer = this.tilesMap.get(nameTile)[flip ? 0 : 1];
			context.drawImage(buffer, x, y);	
	}

	getCoordinatesOfTileFromJSON(fileJSON, nameTile) {
		this.startOfTileX = fileJSON[nameTile].frame.x;
		this.startOfTileY = fileJSON[nameTile].frame.y;
		this.widthOfTile = fileJSON[nameTile].frame.w;
		this.heightOfTile = fileJSON[nameTile].frame.h;
	}
}



