import Timer from './timer';

import createCollisionLayer from './layers/collision';
import createCameraLayer from './layers/camera';

import createPlayerEnvironment from './createPlayerEnvironment';

export default async function drawField(context, sprites) {

    const drawCollisions = createCollisionLayer(sprites);
    const drawCameraView = createCameraLayer(sprites.camera);

    const [drawDashboard, cosmo] = createPlayerEnvironment(sprites);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {

        sprites.drawLevel(context);
        sprites.update(deltaTime, context);

        drawCollisions(context, sprites.camera);
        drawCameraView(context, sprites.camera);
    }
    timer.start();
}
