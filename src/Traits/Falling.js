import {Trait} from '../Entity';

export default class Falling extends Trait {
    constructor() {
        super('falling');
    }

    update(entity, deltaTime, sprites) {
        let currentX = entity.pos.x;
        if (entity.pos.y > 800 && entity.stateCosmo.alive) {
            entity.playerController.death(entity, sprites);

            entity.playerController.time = 60;// here must be variable !!!

        }
    }
}
