
	export function createBackgroundLayer(level, sprites) {

		let  tiles = level.tiles;
		let resolver = level.tileCollider.tiles;

		let bgcBuffer = document.createElement('canvas');
		bgcBuffer.width = 1924;
		bgcBuffer.height = 629;
		let context = bgcBuffer.getContext('2d');

		let startIndex, endIndex;

		function redraw(drawFrom, drawTo) {
			if (drawFrom === startIndex && drawTo === endIndex) {
				return;
			}

			startIndex = drawFrom;
			endIndex = drawTo;

			for (let x = startIndex; x <= endIndex; x = x + 37 ) {
				let col = tiles.grid[x];
				if (col) {
					col.forEach((tile, y) => {
						sprites.drawTile(tile.name, context, x, y);
					});
				}
			}
		}

        // this fun will be called through forEach in compositor instans for concret level 
		return function drawBgcLayer(context, camera) {
			let drawWidth = resolver.toIndexInMatrix(camera.size.x);
			let drawFrom = resolver.toIndexInMatrix(camera.position.x);
			let drawTo = drawFrom + drawWidth;

			redraw(drawFrom, drawTo);

			context.drawImage(bgcBuffer, -camera.position.x, -camera.position.y);
		}
	}

	export 	function createSpriteLayer(entities, width = 64, height = 64) {
		let spriteBeffer = document.createElement('canvas');
		spriteBeffer.width = width;
		spriteBeffer.height = height;
		let spriteBefferContext = spriteBeffer.getContext('2d');

		return function drawSpriteLayer(context, camera) {
			entities.forEach(entity => {
				spriteBefferContext.clearRect(0, 0, width, height);
				entity.draw(spriteBefferContext);

				context.drawImage(
					spriteBeffer,
					entity.position.x - camera.position.x,
					entity.position.y - camera.position.y
					 )
			});
		}
	}
/*
	export function createCollisionLayer(level) {
		let resolvedTiles = [];

		let tileResolver = level.tileCollider.tiles;
		let tileSize = tileResolver.tileSize;

		let getByIndexOriginal = tileResolver.getByIndex;
		tileResolver.getByIndex = function getByIndexFake(x, y) {
			resolvedTiles.push({x, y});
			return getByIndexOriginal.call(tileResolver, x, y);
		}

		return function drawCollision(context, camera) {
			context.lineWidth="3";
			context.strokeStyle = 'blue';
			resolvedTiles.forEach(({x, y}) => {
				context.beginPath();
				context.rect(
					x - camera.position.x,
					y - camera.position.y,
					tileSize, tileSize);
				context.stroke();
				
			});

			context.strokeStyle = 'red';
			level.entities.forEach(entity => {
				context.beginPath();
				context.rect(
					entity.position.x - camera.position.x,
					entity.position.y - camera.position.y,
					entity.size.x, 
					entity.size.y);
				context.stroke();
			})

			resolvedTiles.length = 0;
		};
	}
*/
	export function createCmeralayer (cameraToDraw) {
		return function drawCameraRect (context, fromCamera) {
			context.strokeStyle = 'green';
			
				context.beginPath();
				context.rect(
					cameraToDraw.position.x - fromCamera.position.x,
					cameraToDraw.position.y - fromCamera.position.y,
					cameraToDraw.size.x, 
					cameraToDraw.size.y);
				context.stroke();
		};
	}
