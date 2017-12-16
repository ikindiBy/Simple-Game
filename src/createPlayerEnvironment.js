import {createCosmoFactory} from './Entities/Cosmo';
import PlayerController from './Traits/PlayerController';
import setupKeyboard from './input';
import {setupMouseControl} from './debug';
import createDashboardLayer from './layers/dashboard';

export default function(sprites) {
    const createCosmo = createCosmoFactory(sprites);
    const cosmo = createCosmo();

    createPlayerEnv(cosmo);
    const drawDashboard = createDashboardLayer(cosmo);

    const input = setupKeyboard(cosmo);
    setupMouseControl(canvas, cosmo, sprites.camera);
    input.listenTo(window);

    return [drawDashboard, cosmo];
}

function createPlayerEnv (playerEntity) {
    const playerControl = new PlayerController(playerEntity);
    playerControl.checkPoint.set(42, 42);
    playerEntity.addTrait(playerControl);
}
