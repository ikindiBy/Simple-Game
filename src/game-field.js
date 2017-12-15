import Spritesheet from './spritesheet';
import {loadImage,loadJSON} from './loaders';
import {createEntities} from './entities';
import Timer from './timer';

import createCollisionLayer from './layers/collision';
import drawBackground from './layers/background';
import createCameraLayer from './layers/camera';
import createDashboardLayer from './layers/dashboard';

export default function drawField(context, canvas) {
    Promise.all([
        loadImage('./images/sprites.png'),
        loadJSON('./sprites'),
        loadJSON('./levels/1-2')
    ])
    .then(([image, data, layout]) => {

        const sprites = new Spritesheet(image, data, canvas);

        for (let sprite in data) {
            sprites.define(sprite);
        }

        const drawBackgroundLayer = drawBackground(sprites, layout);
        createEntities(sprites, layout);

        const drawCollisions = createCollisionLayer(sprites);
        const drawCameraView = createCameraLayer(sprites.camera);

        const cosmo = sprites.getEntityByName('cosmo');

        const dashboard = createDashboardLayer(cosmo);

/*
        const input = setupKeyboard(cosmo);
        setupMouseControl(canvas, cosmo, sprites.camera);
        input.listenTo(window);

*/
        const timer = new Timer(1/60);
        timer.update = function update(deltaTime) {

                drawBackgroundLayer(context);
                sprites.update(deltaTime, context);

                drawCollisions(context, sprites.camera);
                drawCameraView(context, sprites.camera);

                dashboard(context);
        }
        timer.start();

        // window.sprites = sprites;
    });
}


function getByName(name) {

}
