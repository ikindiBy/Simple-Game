import {createEnemiesFactory} from './Entities/Enemies'
import {createArtefactsFactory} from './Entities/Artefacts'
import createPlayerEnvironment from './createPlayerEnvironment';

export function createEntities(sprites, layout) {

    const createEnemy = createEnemiesFactory(sprites);
    const createArtefact = createArtefactsFactory(sprites);

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

    layout.artefacts.forEach(artef => {
        const name = artef.name;

        artef.positions.forEach(arrPositions => {
            const [posX, posY] = arrPositions;

            createArtefact(name, posX, posY);
        });
    });

    createPlayerEnvironment(sprites);
}
