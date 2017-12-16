import {Sides, Trait} from '../Entity.js';

export default class PendulumWalk extends Trait {
    constructor(reverse) {
        super('pendulumWalk');
        this.speed = reverse ? 30 : -30;
        let randomForPatrol = Math.random() < 0.5 ? 0.5 : Math.random(); 
        this.amplitudePatrol = randomForPatrol * 1000;
    }

    obstruct(entity, side) {
        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.speed = -this.speed;
        }
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed;
    }
}
