
import {createCollisionLayer} from './layers.js';

let lastEvent;

export function debugging(canvas, entity, level, camera){
		['mousedown', 'mousemove'].forEach(evName => {
		canvas.addEventListener(evName, e => {
			if (e.buttons === 1) {
				entity.velocity.set(0,0);
				entity.position.set(
					e.offsetX + camera.position.x,
					e.offsetY + camera.position.y);
			} else if (e.buttons === 2 && lastEvent 
				&& lastEvent.buttons === 2 && lastEvent.type === 'mousemove') {
				camera.position.x -= e.offsetX - lastEvent.offsetX;
			}
			lastEvent = e;
		})
	});

		canvas.addEventListener('contextmenu', e => {
			e.preventDefault();
		})

		// level.compos.layers.push(createCollisionLayer(level));

}