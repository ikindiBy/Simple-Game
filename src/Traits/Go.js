import {Trait} from '../Entity';

export default class Go extends Trait {
    constructor() {
        super('go');
        this.dir = 0;
        this.speed = 12000;

        this.acceleration = 500;
        this.dragFactor = 0;
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

        const drag = this.dragFactor * entity.vel.x * Math.abs(entity.vel.x);
        entity.vel.x -= drag;
    }
}
