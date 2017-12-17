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
        loadJSON('./alphabet'),
        loadImage('./images/alphabet.png')
    ])
    .then(async ([tileImage, tileData, fontData, fontImage]) => {


        const sprites = new Sprite(tileImage, tileData);
        for (let sprite in tileData) {
            sprites.define(sprite);
        }

        // const font = new Font(fontsData, fontData);
        // 
        // for (let letter in fontData) {
        //     font.define(letter);
        // }

        const drawCollisions = createCollisionLayer(sprites);
        const drawCameraView = createCameraLayer(sprites.camera);

        const [drawDashboard, cosmo] = createPlayerEnvironment(sprites);
        sprites.drawLevel = await createLevelCompositor(sprites);

        const timer = new Timer(1/60);
        timer.update = function update(deltaTime) {

                sprites.drawLevel(context);
                sprites.update(deltaTime, context);

                drawCollisions(context, sprites.camera);
                drawCameraView(context, sprites.camera);

                drawDashboard(context);
        }
        timer.start();
    })
}
