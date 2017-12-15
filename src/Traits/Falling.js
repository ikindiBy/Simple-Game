import {Trait} from '../Entity';

export default class Falling extends Trait {
    constructor() {
        super('falling');
    }

    update(entity) {
        let currentX = entity.pos.x;
        if (entity.pos.y > 800 && entity.stateCosmo.alive) {
            entity.stateCosmo.lives--;
            if (entity.stateCosmo.lives > 0) {
                entity.pos.y = 100;
                entity.pos.x = currentX - 65;
            }          
        }
    }
}
