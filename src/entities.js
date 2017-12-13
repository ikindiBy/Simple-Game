import {createCosmoFactory} from './Entities/Cosmo';
import {createGreenFactory} from './Entities/Green';


import setupKeyboard from './input';
import {setupMouseControl} from './debug';

export function createEntities(sprites, layout) {

    const createGreen = createGreenFactory(sprites);
    // const green = createGreen(200, 479);
    // const green1 = createGreen(320, 479, 'reverse');

    layout.entities.forEach(entity => {
        entity.data.forEach(([x, y, reverse]) => {
            createGreen(x, y, reverse, entity.pictures);
        })
    });

    const createCosmo = createCosmoFactory(sprites);
    const cosmo = createCosmo();

    const input = setupKeyboard(cosmo);
    setupMouseControl(canvas, cosmo, sprites.camera);
    input.listenTo(window);
}
