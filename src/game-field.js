import Sprite from './Sprite';
import Font from './Font';
import {loadImage,loadJSON} from './loaders';
import Timer from './timer';

import createCollisionLayer from './layers/collision';
import createCameraLayer from './layers/camera';

import createLevelCompositor from './createLevelCompositor';
import createPlayerEnvironment from './createPlayerEnvironment';

export default function drawField(context, canvas) {
    Promise.all([
        loadImage('./images/sprites.png'),
        loadJSON('./sprites'),
    //     loadJSON('./levels/1-2'),
    //     loadJSON('./alphabet'),
    //     loadImage('./images/alphabet.png')
    // ])
    // .then(([tileImage, tileData, layout, fontData, fontsData]) => {

        loadJSON('./alphabet'),
        loadImage('./images/alphabet.png')
    ])
    .then(async ([tileImage, tileData, fontData, fontImage]) => {


        const sprites = new Sprite(tileImage, tileData);
        for (let sprite in tileData) {
            sprites.define(sprite);
        }

        // const font = new Font(fontsData, fontData);

        for (let letter in fontData) {
            // font.define(letter);
        }

        const drawCollisions = createCollisionLayer(sprites);
        const drawCameraView = createCameraLayer(sprites.camera);

        const [drawDashboard, cosmo] = createPlayerEnvironment(sprites);
        sprites.drawLevel = await createLevelCompositor(sprites);

        const timer = new Timer(1/60);
        timer.update = function update(deltaTime) {

                sprites.drawLevel(context);
                sprites.update(deltaTime, context);
                // font.print('!@#$%*,', context, 0, 100, 90, 90);
                // font.print('1234567890', context, 0, 200, 90, 90);
                // font.print('QWERTYUIOP', context, 0, 300, 90, 90);
                // font.print('ASDFGHJKL', context, 0, 400, 90, 90);
                // font.print('ZXCVBNM', context, 0, 500, 90, 90);

                drawCollisions(context, sprites.camera);
                drawCameraView(context, sprites.camera);

                drawDashboard(context);
        }
        timer.start();
    })
}
