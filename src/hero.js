import Entity from './entity';
import {createCosmo} from './entities';
import Timer from './timer';
import {createCollisionLayer} from './layers';
import setupKeyboard from './input';

export default function makeHero(buffer, sprites, bgImage, context) {

    const cosmo = createCosmo();
    cosmo.pos.set(185, 420);
    // cosmo.vel.set(150, -600);
    cosmo.vel.set(0, -600);

    const drawCollisions = createCollisionLayer(sprites);

    sprites.entities.add(cosmo);

    const input = setupKeyboard(cosmo);
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
    }
    timer.start();
}
