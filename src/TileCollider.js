import TileResolver from './TileResolver'

export default class TileCollider {
    constructor(tileLayout) {
        this.tiles = new TileResolver(tileLayout);
    }

    checkY(entity) {
        const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);
        if(!match) {
            return;
        }
        if (entity.vel.y > 0) {
            if (entity.pos.y > match.y1) {
                entity.pos.y = match.y1;
                entity.vel.y = 0;
            }

        }
    }

    test(entity) {
        this.checkY(entity);
        //
        // const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);
        // if (match) {
        //     console.log('matched tile', match, match.tile);
        // }
    }
}
