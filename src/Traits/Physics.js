import {Sides, Trait} from '../Entity.js';

export default class Physics extends Trait {
    constructor() {
        super('physics');

        this.countPatrol = 0;
    }

    update(entity, deltaTime, sprites) {

        if (entity.name.includes('black')) {

            let distanceAll = Math.abs(entity.pendulumWalk.speed) * entity.lifetime;
            let deltaDistance = distanceAll - this.countPatrol * entity.pendulumWalk.amplitudePatrol;
            let positionBySinusoid = 1 - Math.sin(Math.PI * entity.lifetime)/15;

            if (deltaDistance > entity.pendulumWalk.amplitudePatrol) {

                this.countPatrol++;
                entity.pendulumWalk.speed = -entity.pendulumWalk.speed;
            }

            if (!entity.killable.dead) {
                entity.vel.y = 0;
                entity.pos.y = entity.startPositin.y * positionBySinusoid;
            }
        }

        entity.pos.x += entity.vel.x * deltaTime;
        sprites.tileCollider.checkX(entity, sprites.camera);

        entity.pos.y += entity.vel.y * deltaTime;
        sprites.tileCollider.checkY(entity, sprites.camera);

        entity.vel.y += sprites.gravity * deltaTime;
    }
}
