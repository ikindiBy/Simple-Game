

export function debugging(){
		['mousedown', 'mousemove'].forEach(evName => {
		canvas.addEventListener(evName, e => {
			if (e.buttons === 1) {
				hero.velocity.set(0,0);
				hero.position.set(e.offsetX, e.offsetY);
			}
		})
	});


		level.compos.layers.push(createCollisionLayer(level));



}