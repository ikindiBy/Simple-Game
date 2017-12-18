export function setupMouseControl(canvas, entity, camera) {
    let lastEvent;

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(event.offsetX + camera.pos.x,
                               event.offsetY + camera.pos.y);
            }
        })
    });

    window.addEventListener('keydown', event => {
        // console.log(event.code);
        if (event.code === 'KeyD') {
            camera.pos.x += 75;
        }
        if (event.code === 'KeyA') {
            camera.pos.x -= 75;
        }
    });
}
