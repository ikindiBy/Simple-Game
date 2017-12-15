import {Trait} from '../Entity';

export default class ReachEdge extends Trait {
    constructor() {
        super('reachEdge');
    }

    update(entity, deltaTime, sprites) {
        if (entity.pos.x < 0) {
                // entity.pos.x = 1;
        }
    }
}
