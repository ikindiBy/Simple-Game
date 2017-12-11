import Spritesheet from './spritesheet';
import {loadImage,loadJSON} from './loaders';

import Entity from './entity';
import {createCosmo} from './entities';

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
        const cosmo = createCosmo(sprites);

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

                drawCollisions(context, sprites.camera);
                drawCameraView(context, sprites.camera);
        }
        timer.start();

        window.sprites = sprites;
    });
}
