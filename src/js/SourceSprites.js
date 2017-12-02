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

	// defineTile(name, x, y) {
	// 	console.log('image-->', this.image);
	// 	const bufferForTile = document.createElement('canvas');
	// 	bufferForTile.width = this.widthOfTile;
	// 	bufferForTile.height = this.heightOfTile;
	// 	const bufferContext = bufferForTile.getContext('2d');
	// 	bufferContext.drawImage(
	// 		this.image,
	// 		150,
	// 		0,
	// 		this.widthOfTile,
	// 		this.heightOfTile,
	// 		0,
	// 		0,
	// 		this.widthOfTile,
	// 		this.heightOfTile);
	// 		this.tilesMap.set(name, bufferForTile);
	// }

	defineTilePerJSON(fileJSON, nameTile) {
		this.getCoordinatesOfTileFromJSON(fileJSON, nameTile);
		// console.log('workWithJSON--',this.widthOfTile, nameTile);
		const bufferForTile = document.createElement('canvas');
			bufferForTile.width = this.widthOfTile;
			bufferForTile.height = this.heightOfTile;
			const bufferContext = bufferForTile.getContext('2d');
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
			this.tilesMap.set(nameTile, bufferForTile);
	}

	drawTile(nameTile, context, x, y) {
			// console.log('image and map->', this.image, this.tilesMap, context, nameTile);
			const buffer = this.tilesMap.get(nameTile);
			// console.log('draw buffer->',buffer);
			context.drawImage(buffer, x, y);	
	}

	getCoordinatesOfTileFromJSON(fileJSON, nameTile) {
		this.startOfTileX = fileJSON[nameTile].frame.x;
		this.startOfTileY = fileJSON[nameTile].frame.y;
		this.widthOfTile = fileJSON[nameTile].frame.w;
		this.heightOfTile = fileJSON[nameTile].frame.h;
	}


	// defineTileFromJSON(nameTile) {
	// 	loadTilesFromJSON('sprites')
	// 	.then( fileJSON => {
	// 		this.getCoordinatesOfTileFromJSON(fileJSON, nameTile);
	// 	})
	// 	.then(()=> {
	// 		const bufferForTile = document.createElement('canvas');
	// 		bufferForTile.width = this.widthOfTile;
	// 		bufferForTile.height = this.heightOfTile;
	// 		const bufferContext = bufferForTile.getContext('2d');
	// 		bufferContext.drawImage(
	// 			this.image,
	// 			this.startOfTileX,
	// 			this.startOfTileY,
	// 			this.widthOfTile,
	// 			this.heightOfTile,
	// 			0,
	// 			0,
	// 			this.widthOfTile,
	// 			this.heightOfTile);
	// 		this.tilesMap.set(nameTile, bufferForTile);
			
	// 		console.log('TILE -  - ->', this.startOfTileX, this.tilesMap);
	// 	});
	// }

	// draw(nameTile, context, x, y) {
	// 	this.defineTileFromJSONPr(nameTile).
	// 	then(() => {
	// 		console.log('image and map->', this.image, this.tilesMap, context, nameTile);
	// 		const buffer = this.tilesMap.get(nameTile);
	// 		console.log('draw buffer->',buffer);
	// 		context.drawImage(buffer, x, y);
	// 	})
		
	// }

	


	// defineTileFromJSONPr(nameTile) {
	// 	return new Promise(resolve => {

	// 		loadTilesFromJSON('sprites')
	// 		.then( fileJSON => {
	// 			this.getCoordinatesOfTileFromJSON(fileJSON, nameTile);
	// 		})
	// 		.then(()=> {
	// 			const bufferForTile = document.createElement('canvas');
	// 			bufferForTile.width = this.widthOfTile;
	// 			bufferForTile.height = this.heightOfTile;
	// 			const bufferContext = bufferForTile.getContext('2d');
	// 			bufferContext.drawImage(
	// 				this.image,
	// 				this.startOfTileX,
	// 				this.startOfTileY,
	// 				this.widthOfTile,
	// 				this.heightOfTile,
	// 				0,
	// 				0,
	// 				this.widthOfTile,
	// 				this.heightOfTile);
	// 			this.tilesMap.set(nameTile, bufferForTile);
				
	// 			console.log('TILE - pr  - ->', this.startOfTileX, this.tilesMap);
	// 		});
	// 		resolve();
	// 	})
		
	// }


}



