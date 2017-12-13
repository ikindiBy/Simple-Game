import {Sides, Trait} from '../Entity.js';

export default class Killable extends Trait {
    constructor() {
        super('killable');
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 2;
    }

    kill(){
        this.dead = true;
    }

    update(entity, deltaTime, sprites) {
        if (this.dead) {
            entity.pictures = entity.deadPic;

            if (entity.name === 'purple') {
                entity.offset.y = -10;
            }

            this.deadTime += deltaTime;

            if (this.deadTime > this.removeAfter) {
                console.log('lol');
                sprites.entities.delete(entity);
            }
        }
    }
}
