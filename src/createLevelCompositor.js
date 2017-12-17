import drawBackground from './layers/background';
import {loadJSON} from './loaders';
import {createEntities} from './entities';

export default function(sprites) {
      loadJSON(`./levels/1-${sprites.level}`).then((layout) => {
        sprites.entities.forEach(entity => {
            if (!entity.player) {
                sprites.entities.delete(entity);
            } else {
                entity.pos.set(100, 100);
            }
        });
        sprites.tilesMatrix.grid = [];

        createEntities(sprites, layout);

        sprites.drawLevel = drawBackground(sprites, layout);
    }).catch(e => {
        console.log('no more levels');
    });
}
