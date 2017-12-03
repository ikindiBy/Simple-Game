	


	export function createBackgroundLayer(backgrounds, sprites) {
		let bgcBuffer = document.createElement('canvas');
		bgcBuffer.width = 960;
		bgcBuffer.height = 640;

		backgrounds.forEach(background => {
			drawBackground(background, bgcBuffer.getContext('2d'), sprites);
		});

		return function drawBgcLayer(context) {
			context.drawImage(bgcBuffer, 0, 0);
		}
	}

	function drawBackground(backgrounOf, context, sprites) {
		backgrounOf.ranges.forEach(([x1, x2, y1, y2]) => {
			for(let x = x1; x < x2; x = x+37) {
				for(let y = y1; y<y2; y= y+37) {
				sprites.drawTile(backgrounOf.tile, context, x, y);	
				}
			}
		})
	}	

	export 	function createSpriteLayer(entity) {
		return function drawSpriteLayer(context) {
			entity.draw(context);
		}
	}