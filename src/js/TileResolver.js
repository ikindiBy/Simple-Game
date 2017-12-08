export default class TileResolver {
	constructor(matrix, tileSize = 37) {
		this.matrix = matrix;
		this.tileSize = tileSize;
	}

	// toIndex(position) {
	// 	return Math.floor(position / this.tileSize);
	// }

	toIndexInMatrix(position) {
		return this.tileSize*Math.floor(position / this.tileSize);
	}

	getByIndex(indexX, indexY) {
		let tile = this.matrix.get(indexX, indexY);
		let sdf = this.matrix.get(37,566);
		if (tile) {
			return {
				tile,
			};
		}
	}

	// matchByPosition(posX, posY) {
	// 	return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
	// }

	matchByPosition(posX, posY) {
		return this.getByIndex(
			this.toIndexInMatrix(posX),
			this.toIndexInMatrix(posY));
	}
}