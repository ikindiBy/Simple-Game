import drawBackground from './layers/background';
import {loadJSON} from './loaders';
import {createEntities} from './entities';

export default function(sprites) {
      return loadJSON(`./levels/1-${sprites.level}`).then((layout) => {
        sprites.entities.forEach(entity => {
            if (entity.name !== 'cosmo') {
                sprites.entities.delete(entity);
            } else {
                entity.pos.set(100, 100);
            }
        });
        sprites.tilesMatrix.grid = [];

        createEntities(sprites, layout);

        const drawBackgroundLayer = drawBackground(sprites, layout);
        return drawBackgroundLayer;
    });
}
