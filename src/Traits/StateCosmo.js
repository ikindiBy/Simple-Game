import {Trait} from '../Entity';

export default class StateCosmo extends Trait {
    constructor() {
        super('stateCosmo');
        this.lives = 3;
        this.coins = 0;
        this.keys = 0;
        this.locks = 0;
        this.alive = true;
    }

    update(entity, deltaTime, sprites) {

        if (this.coins > 50) {
            this.coins = 0;
            this.lives++;
        }

        if (this.locks === 1) {
            this.locks = 0;
            sprites.level++;
            sprites.createLevelCompositor('won');
            entity.playerController.updateTimer();
        }
    }
}
