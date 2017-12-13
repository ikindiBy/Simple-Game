import Entity, {Sides} from '../Entity';
import Jump from '../Traits/Jump';
import Go from '../Traits/Go';
import PendulumWalk from '../Traits/PendulumWalk';

const SLOW_DRAG = 1/2000;
const FAST_DRAG = 0;

export function createGreenFactory(sprites) {

    return function createGreen(x, y, reverse, pictures) {
        const green = new Entity('green');

        green.size.set(26, 40);
        //size was 76 => we are cutting 36 and move offset +36
        green.pos.set(x, y);
        green.vel.set(0, -600);
        green.offset.y = 33;

        green.pictures = reverse ? pictures : pictures.reverse();
        green.picture = null;

        green.addTrait(new PendulumWalk());

        sprites.entities.add(green);
    };
}
