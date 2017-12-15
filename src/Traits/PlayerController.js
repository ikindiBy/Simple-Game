import {Trait} from '../Entity';
import {Vect} from '../math';

export default class PlayerController extends Trait {
    constructor(entity) {
        super('playerController');
        this.player = entity;
        this.checkPoint = new Vect(42, 42);
        this.time = 60;
    }

    update(entity, deltaTime, sprites) {
        if (!sprites.entities.has(entity) && entity.stateCosmo.alive) {

            entity.stateCosmo.lives--;
            console.log('lol');
            if (entity.stateCosmo.lives > 0) {
                this.player.killable.revive();
                this.player.pos.set(this.checkPoint.x, this.checkPoint.y);
                sprites.entities.add(this.player);
            }
        } else {
            this.time -= deltaTime;
        }
        console.log(this.player);
    }
}
