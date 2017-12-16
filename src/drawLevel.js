import drawBackground from './layers/background';
import {loadJSON} from './loaders';
import {createEntities} from './entities';

export default function(sprites, level) {
    return loadJSON(`./levels/1-${level}`).then((layout) => {
        sprites.entities.forEach(entity => {
            sprites.entities.delete(entity)
        });
        sprites.tilesMatrix.grid = [];

        createEntities(sprites, layout);
        const drawBackgoundLayer = drawBackground(sprites, layout);
        return drawBackgoundLayer;
    });
}
