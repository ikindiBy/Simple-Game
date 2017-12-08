import TileResolver from './TileResolver.js';



export default class TileCollider {
	constructor(matrixOfTiles) {
		this.tiles = new TileResolver(matrixOfTiles);
	}

	test(entity) {
		// let match = this.tiles.matchByPosition(entity.position.x, entity.position.y);
		let match = this.tiles.matchByPosition(entity.position.x, entity.position.y);
		if (match) {
			// console.log('--->>',  match.tile);
		}
	}
}