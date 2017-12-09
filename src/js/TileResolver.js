export default class TileResolver {
	constructor(matrix, tileSize = 37) {
		this.matrix = matrix;
		this.tileSize = tileSize;
	}

	toIndexInMatrix(position) {
		return this.tileSize*Math.floor(position / this.tileSize);
	}

	getByIndex(indexX, indexY) {
		let tile = this.matrix.get(indexX, indexY);
		
		if (tile) {
			let x1 = indexX;
			let x2 = x1 + this.tileSize;
			let y1 = indexY;
			let y2 = y1 + this.tileSize;
			return {
				tile,
				x1,
				x2,
				y1,
				y2,
			};
		}
	}

	toIndexRange(pos1, pos2) {
		let pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
		let range = [];
		let pos = pos1;
		do {
			range.push(this.toIndexInMatrix(pos));
			pos += this.tileSize;
		} while (pos < pMax);
		return range;
	}

	searchByPosition(posX, posY) {
		return this.getByIndex(
			this.toIndexInMatrix(posX),
			this.toIndexInMatrix(posY));
	}

	searchByRange(x1, x2, y1, y2) {
		let matches = [];
		this.toIndexRange(x1, x2).forEach(indexX => {
			this.toIndexRange(y1, y2).forEach(indexY => {
				let match = this.getByIndex(indexX, indexY);
				if (match) {
					matches.push(match);
				} 
			});
		});
		return matches;
	}
}