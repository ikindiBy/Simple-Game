import {Trait} from '../Entity';
import {Vect} from '../math';

export const TIME_LIMIT = 60;

export default class PlayerController extends Trait {
    constructor(entity) {
        super('playerController');

        this.player = entity;
        this.checkPoint = new Vect(0, 0);

        this.time = TIME_LIMIT;
        this.stopTime = false;
    }

    death(entity, sprites) {
        this.player.stateCosmo.lives--;

        if (this.player.stateCosmo.alive) {
            this.player.killable.kill();
        }

        if (this.player.stateCosmo.lives > 0) {
            this.player.killable.revive();
            this.player.pos.set(this.checkPoint.x, this.checkPoint.y);
            sprites.entities.add(this.player);
        } else {
            entity.stateCosmo.alive = false;
            entity.sounds.playSound('gameOver');
            sprites.gameOver();
        }

        this.updateTimer();
    }

    updateTimer() {
        this.time = TIME_LIMIT;
    }

    update(entity, deltaTime, sprites, context) {
        if (!sprites.entities.has(entity) && entity.stateCosmo.alive) {

            this.death(entity, sprites);

        } else if (!this.stopTime){

            this.time -= deltaTime * sprites.level;
        }

        if (this.time <= 0) {
            this.death(entity, sprites);
        }
    }
}
