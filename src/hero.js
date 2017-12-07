import Entity from './entity';
import {createCosmo} from './entities';
import Timer from './timer';
import KeyboardListener from './keyboardState';

export default function makeHero(buffer, sprites, bgImage, context) {

    const gravity = 2000;

    const cosmo = createCosmo();
    cosmo.pos.set(120, 516);
    cosmo.vel.set(150, -600);

    sprites.entities.add(cosmo);

    const SPACE = 32;
    const input = new KeyboardListener();

    input.addMapping(SPACE, keyState => {
        console.log(keyState);
        if (keyState) {
            cosmo.jump.start();
        } else {
            cosmo.jump.cancel();
        }
    });
    input.listenTo(window);

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                cosmo.vel.set(0, 0);
                cosmo.pos.set(event.offsetX, event.offsetY);
            }
        })
    });

    const timer = new Timer(1/60);

    timer.update = function update(deltaTime) {
            // cosmo.update(deltaTime);
            sprites.update(deltaTime);

            context.drawImage(buffer, 0, 0);
            sprites.draw('boy1', context, cosmo.pos.x, cosmo.pos.y);

            cosmo.vel.y += gravity * deltaTime;
    }
    timer.start();
}
