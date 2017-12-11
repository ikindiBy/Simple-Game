import {Vect} from './math';

export let Sides = {
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

    update() {
        console.log('Update method is not provided');
    }
}


export default class Entity {
    constructor() {
        this.pos = new Vect(0,0);
        this.vel = new Vect(0,0);
        this.size = new Vect(0,0);

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
    }
}
