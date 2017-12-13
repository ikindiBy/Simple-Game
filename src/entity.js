import {Vect} from './math';
import BoundingBox from './BoundingBox.js';

export const Sides = {
        TOP: Symbol('top'),
        BOTTOM: Symbol('bottom'),
        LEFT: Symbol('left'),
        RIGHT: Symbol('right'),
    };

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    obstruct() {

    }

    collides(us, them) {

    }

    update() {

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
        });
    }

    collides(candidate) {
        this.traits.forEach( trait => {
            trait.collides(this, candidate);
        });
    }

    update(deltaTime, sprites) {
        this.traits.forEach( trait => {
            trait.update(this, deltaTime, sprites);
        })

        this.lifetime += deltaTime;
    }
}
