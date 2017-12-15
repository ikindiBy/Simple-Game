import {Trait} from '../Entity';
import {Vect} from '../math';

export default class PlayerController extends Trait {
    constructor(entity) {
        super('playerController');

        this.player = entity;
        this.checkPoint = new Vect(0, 0);

        this.time = 60;
        this.stopTime = false;
    }

    death(entity, sprites) {
        entity.stateCosmo.lives--;

        if (entity.stateCosmo.lives > 0) {
            this.player.killable.revive();
            this.player.pos.set(this.checkPoint.x, this.checkPoint.y);
            sprites.entities.add(this.player);
        }
    }

    update(entity, deltaTime, sprites) {
        if (!sprites.entities.has(entity) && entity.stateCosmo.alive) {
            this.death(entity,sprites);
        } else if (!this.stopTime){
            this.time -= deltaTime;
        }

        if (this.time <= 0) {
            this.death(entity,sprites);
            this.time = 60;
        }
    }
}
