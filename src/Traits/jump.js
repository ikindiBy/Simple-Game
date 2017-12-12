import {Trait, Sides} from '../Entity';

export default class Jump extends Trait {
    constructor() {
        super('jump');

        this.duration = 0.5;
        this.velocity = 200;
        this.engageTime = 0;

        this.ready = 1;
        this.requestTime = 0;
        this.gracePeriod = 0.5;

        this.speedBoost = 0.3;
    }

    start() {
        this.requestTime = this.gracePeriod;
    }

    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }

    obstruct(entity, side) {
        if (side === Sides.FLOOR) {
            this.ready = 1;
        } else if (side === Sides.CEILING) {
            this.cancel();
        }
    }

    update(entity, deltaTime) {
        if (this.requestTime > 0) {
            if (this.ready > 0) {
                this.engageTime = this.duration;
                this.requestTime = 0;
            }
            this.requestTime -= deltaTime;
        }


        if (this.engageTime > 0) {
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
            this.engageTime -= deltaTime;
        }

        this.ready--;
    }
}
