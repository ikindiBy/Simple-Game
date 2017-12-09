import TileResolver from './TileResolver.js';



export default class TileCollider {
	constructor(matrixOfTiles) {
		this.tiles = new TileResolver(matrixOfTiles);
	}

	checkX(entity) {
		let x;

		if (entity.velocity.x > 0) {
			x = entity.position.x + entity.size.x;
		} else if (entity.velocity.x < 0) {
			x = entity.position.x;
		} else {
			return;
		}

		let matches = this.tiles.searchByRange(
			x, x,
			entity.position.y, entity.position.y + entity.size.y);
		
		matches.forEach(match => {

			if (match.tile.description !== 'ground') {
				return;
			}

			if (entity.velocity.x > 0) {
				if (entity.position.x + entity.size.x > match.x1) {
					entity.position.x = match.x1 - entity.size.x;
					entity.velocity.x = 0;
				}
			} else if (entity.velocity.x < 0) {
				if (entity.position.x < match.x2) {
					entity.position.x = match.x2;
					entity.velocity.x = 0;
				}
			}
		});
	}

	checkY(entity) {
		let y;

		if (entity.velocity.y > 0) {
			y = entity.position.y + entity.size.y;
		} else if (entity.velocity.y < 0) {
			y = entity.position.y;
		} else {
			return;
		}

		// let match = this.tiles.searchByPosition(entity.position.x, entity.position.y);
		let matches = this.tiles.searchByRange(
			entity.position.x, entity.position.x + entity.size.x,
			y, y);
		
		matches.forEach(match => {
			// if (!match) {
			// return; 
			// }

			if (match.tile.description !== 'ground') {
				return;
			}

			if (entity.velocity.y > 0) {
				if (entity.position.y + entity.size.y > match.y1) {
					entity.position.y = match.y1 - entity.size.y;
					entity.velocity.y = 0;
					// console.log(match.y1, entity.position.y, entity.velocity.y, entity.velocity.x);
				}
			} else if (entity.velocity.y < 0) {
				if (entity.position.y < match.y2) {
					entity.position.y = match.y2;
					entity.velocity.y = 0;
					// console.log(match.y1, entity.position.y, entity.velocity.y, entity.velocity.x);
				}
			}
		});
	}

	test(entity) {
		this.checkY(entity);
	}
}