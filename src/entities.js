import {createCosmoFactory} from './Entities/Cosmo';
import {createEnemiesFactory} from './Entities/Enemies'

import PlayerController from './Traits/PlayerController';

import setupKeyboard from './input';
import {setupMouseControl} from './debug';

export function createEntities(sprites, layout) {

    const createEnemy = createEnemiesFactory(sprites);

    layout.entities.forEach(species => {
        const name = species.name;
        const [sizeX, sizeY] = species.data.size;
        const pictures = species.data.pictures;
        const deadPic = species.data.deadPic;
        const [velX, velY] = species.data.velocity;

        species.positions.forEach(entity => {
            const [posX, posY, reverse] = entity.pos;
            const [offsetX, offsetY] = entity.offset;

            createEnemy(name, posX, posY,
                              offsetX, offsetY,
                              sizeX, sizeY,
                              velX, velY,
                              reverse, pictures, deadPic);
        });
    });

    const createCosmo = createCosmoFactory(sprites);
    const cosmo = createCosmo();

    createPlayerEnv(cosmo);

    const input = setupKeyboard(cosmo);
    setupMouseControl(canvas, cosmo, sprites.camera);
    input.listenTo(window);

    return cosmo;
}

function createPlayerEnv (playerEntity, camera) {
    const playerControl = new PlayerController(playerEntity, camera);
    playerControl.checkPoint.set(42, 42);
    playerEntity.addTrait(playerControl);
}
