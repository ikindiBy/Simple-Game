import Entity from './entity';
import {createCosmo} from './entities';
import Timer from './timer';
import KeyboardListener from './keyboardState';
import {createCollisionLayer} from './layers';

export default function makeHero(buffer, sprites, bgImage, context) {

    const gravity = 2000;

    const cosmo = createCosmo();
    cosmo.pos.set(120, 510);
    // cosmo.vel.set(150, -600);
    cosmo.vel.set(0, -600);

    const drawCollisions = createCollisionLayer(sprites);

    sprites.entities.add(cosmo);

    const SPACE = 32;
    const input = new KeyboardListener();

    input.addMapping(SPACE, keyState => {
        if (keyState) {
            cosmo.jump.start();
        } else {
            cosmo.jump.cancel();
        }
    });
    input.addMapping(39, keyState => {
        cosmo.go.dir = keyState;
    });
    input.addMapping(37, keyState => {
        cosmo.go.dir = -keyState;
    });
    input.listenTo(window);

    // ['mousedown', 'mousemove'].forEach(eventName => {
    //     canvas.addEventListener(eventName, event => {
    //         if (event.buttons === 1) {
    //             cosmo.vel.set(0, 0);
    //             cosmo.pos.set(event.offsetX, event.offsetY);
    //         }
    //     })
    // });

    const timer = new Timer(1/60);

    timer.update = function update(deltaTime) {
            sprites.update(deltaTime);


            context.drawImage(buffer, 0, 0);
            sprites.drawSomething('box-y1', context, 111, 518);
            sprites.drawSomething('box-y1', context, 148, 481);
            sprites.drawSomething('box-y1', context, 185, 444);
            sprites.draw('boy1', context, cosmo.pos.x, cosmo.pos.y);

            drawCollisions(context);

            cosmo.vel.y += gravity * deltaTime;
    }
    timer.start();
}
