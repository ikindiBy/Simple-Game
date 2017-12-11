import {Trait} from '../entity';

export default class Go extends Trait {
    constructor() {
        super('go');
        this.dir = 0;
        this.speed = 12000;

        this.acceleration = 500;
    }

    update(entity, deltaTime) {
        const maxSpeed = this.speed * deltaTime * this.dir;

        if (entity.go.dir > 0 && entity.vel.x < maxSpeed) {
            entity.vel.x += this.acceleration * deltaTime * this.dir;
        } else if (entity.go.dir < 0 && entity.vel.x > maxSpeed) {
            entity.vel.x += this.acceleration * deltaTime * this.dir;
        } else {
            entity.vel.x = maxSpeed;
        }
    }
}
