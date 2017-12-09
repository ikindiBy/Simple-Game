
	export function createBackgroundLayer(level, sprites) {
		let bgcBuffer = document.createElement('canvas');
		bgcBuffer.width = 962;
		bgcBuffer.height = 629;
		let context = bgcBuffer.getContext('2d');

		level.tiles.forEach((tile, x, y) => {
				sprites.drawTile(tile.name, context, x, y);
		});

		return function drawBgcLayer(context) {
			context.drawImage(bgcBuffer, 0, 0);
		}
	}
	
	export 	function createSpriteLayer(entities) {
		return function drawSpriteLayer(context) {
			entities.forEach(entity => {
				entity.draw(context);
			});
		}
	}

	export function createCollisionLayer(level) {
		// console.log('d-r-w createCollisionLayer-w-w-w');
		let resolvedTiles = [];

		let tileResolver = level.tileCollider.tiles;
		let tileSize = tileResolver.tileSize;

		let getByIndexOriginal = tileResolver.getByIndex;
		tileResolver.getByIndex = function getByIndexFake(x, y) {
			// console.log('====>>',x,y);
			resolvedTiles.push({x, y});
			return getByIndexOriginal.call(tileResolver, x, y);
		}

		return function drawCollision(context) {
			// console.log('d-r-w-w-w-w', resolvedTiles);
			context.lineWidth="3";
			context.strokeStyle = 'blue';
			resolvedTiles.forEach(({x, y}) => {
				// console.log('drwwww',x,y);
				context.beginPath();
				context.rect(x, y, tileSize, tileSize);
				context.stroke();
				
			});

			context.strokeStyle = 'red';
			level.entities.forEach(entity => {
				context.beginPath();
				context.rect(entity.position.x, entity.position.y,
							 entity.size.x, entity.size.y);
				context.stroke();
			})

			resolvedTiles.length = 0;
		};
	}