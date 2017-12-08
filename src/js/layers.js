
	export function createBackgroundLayer(level, sprites) {
		let bgcBuffer = document.createElement('canvas');
		bgcBuffer.width = 960;
		bgcBuffer.height = 640;
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