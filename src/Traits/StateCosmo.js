import {Trait} from '../Entity';

export default class StateCosmo extends Trait {
    constructor() {
        super('stateCosmo');
        this.lives = 3;
        this.coins = 0;
        this.keys = 0;
        this.opebedLocks = 0;

    }

    update(entity, deltaTime) {
        if (this.lives == 0) {
            console.log('game over');
        }
        
    }
}
