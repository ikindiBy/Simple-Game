import {Sides, Trait} from '../Entity.js';

export default class Physics extends Trait {
    constructor() {
        super('physics');

    }

    update(entity, deltaTime, sprites) {
        entity.pos.x += entity.vel.x * deltaTime;
        sprites.tileCollider.checkX(entity, sprites.camera);

        entity.pos.y += entity.vel.y * deltaTime;
        sprites.tileCollider.checkY(entity, sprites.camera);

        entity.vel.y += sprites.gravity * deltaTime;
    }
}
