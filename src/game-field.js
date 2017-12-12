import Spritesheet from './spritesheet';
import {loadImage,loadJSON} from './loaders';

import Entity from './Entity';
import {createCosmoFactory} from './Entities/Cosmo';
import {createGreenFactory} from './Entities/Green';

import Timer from './timer';

import {createCollisionLayer, drawBackground, createCameraLayer} from './layers';

import setupKeyboard from './input';
import {setupMouseControl} from './debug';


export default function drawField(context, canvas) {
    Promise.all([
        loadImage('./images/sprites.png'),
        loadJSON('./sprites'),
        loadJSON('./levels/1-1')
    ])
    .then(([image, data, layout]) => {

        const sprites = new Spritesheet(image, data, canvas);

        for (let sprite in data) {
            sprites.define(sprite);
        }

        const drawBackgroundLayer = drawBackground(sprites, layout);

        const createCosmo = createCosmoFactory(sprites);
        const cosmo = createCosmo();

        const createGreen = createGreenFactory(sprites);
        const green = createGreen();

        const drawCollisions = createCollisionLayer(sprites);
        const drawCameraView = createCameraLayer(sprites.camera);

        const input = setupKeyboard(cosmo);
        setupMouseControl(canvas, cosmo, sprites.camera);
        input.listenTo(window);


        const timer = new Timer(1/60);
        timer.update = function update(deltaTime) {
                sprites.update(deltaTime);

                drawBackgroundLayer(context);
                sprites.drawCosmo(cosmo, context);

                sprites.draw(green.picture, context, green.pos.x, green.pos.y);

                if (cosmo.pos.x > 300) {
                    sprites.camera.pos.x = cosmo.pos.x - 300;
                }

                drawCollisions(context, sprites.camera);
                drawCameraView(context, sprites.camera);
        }
        timer.start();

        window.sprites = sprites;
    });
}
