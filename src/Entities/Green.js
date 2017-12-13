import Entity, {Sides, Trait} from '../Entity';
import Jump from '../Traits/Jump';
import Go from '../Traits/Go';
import PendulumWalk from '../Traits/PendulumWalk';

const SLOW_DRAG = 1/2000;
const FAST_DRAG = 0;

class Behavior extends Trait{
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        us.pendulumWalk.speed = 0;
    }
}

export function createGreenFactory(sprites) {

    return function createGreen(x, y, reverse, pictures) {
        const green = new Entity('green');

        green.size.set(26, 40);
        //size was 76 => we are cutting 36 and move offset +36
        green.pos.set(x, y);
        green.vel.set(0, -600);
        green.offset.y = 33;

        green.pictures = reverse ? Array.from(pictures).reverse() : pictures;
        green.picture = null;

        green.addTrait(new PendulumWalk());
        green.addTrait(new Behavior());

        sprites.entities.add(green);
    };
}
