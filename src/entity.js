import {Vect} from './math.js';

export default class Entity {
    constructor() {
        this.pos = new Vect(0,0);
        this.vel = new Vect(0,0);
    }
}
