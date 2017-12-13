import {Vect} from './math';
import BoundingBox from './BoundingBox.js';

export const Sides = {
    CEILING: Symbol('top'),
    FLOOR: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right'),
};

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    obstruct() {

    }

    update() {
        console.log('Update method is not provided');
    }
}

export default class Entity {
    constructor(name) {
        this.name = name;
        this.pos = new Vect(0,0);
        this.vel = new Vect(0,0);
        this.size = new Vect(0,0);
        this.offset = new Vect(0,0);

        this.lifetime = 0;
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    obstruct(side) {
        this.traits.forEach( trait => {
            trait.obstruct(this, side);
        })
    }

    update(deltaTime) {
        this.traits.forEach( trait => {
            trait.update(this, deltaTime);
        })

        this.lifetime += deltaTime;
    }
}
