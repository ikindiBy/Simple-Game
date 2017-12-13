export default class TileCollider {
    constructor(entities) {
        this.entities = entities;
    }

    check(entity) {
        this.entities.forEach(candidate => {
            if (entity === candidate) {
                return;
            }

            if (entity.bounds.overlaps(candidate.bounds)){
                entity.collides(candidate);
                candidate.collides(entity);
            }
        })
    }
}
