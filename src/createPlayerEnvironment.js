import {createCosmoFactory} from './Entities/Cosmo';
import PlayerController from './Traits/PlayerController';
import setupKeyboard from './input';
import {setupMouseControl} from './debug';

export default function(sprites) {
    const createCosmo = createCosmoFactory(sprites);
    const cosmo = createCosmo();

    createPlayerEnv(cosmo);

    const input = setupKeyboard(cosmo);
    // setupMouseControl(canvas, cosmo, sprites.camera);
    input.listenTo(window);
}

function createPlayerEnv (playerEntity) {
    const playerControl = new PlayerController(playerEntity);
    playerControl.checkPoint.set(42, 42);
    playerEntity.addTrait(playerControl);
}
