import Entity from './entity.js';
import {createcosmo} from './entities.js';
import Timer from './timer.js';

export default function makeHero(buffer, sprites, bgImage, context) {
    sprites.draw('boy1', context, 64);

    const gravity = 2000;

    const cosmo = createcosmo();
    cosmo.pos.set(120, 516);
    cosmo.vel.set(150, -600);


    const timer = new Timer(1/60);

    timer.update = function update(deltaTime) {
            cosmo.update(deltaTime);
            console.log(deltaTime);

            context.drawImage(buffer, 0, 0);
            sprites.draw('boy1', context, cosmo.pos.x, cosmo.pos.y);

            cosmo.vel.y += gravity * deltaTime;
    }
    timer.start();
}
