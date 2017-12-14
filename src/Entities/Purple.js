import Entity, {Sides, Trait} from '../Entity';
import Jump from '../Traits/Jump';
import Go from '../Traits/Go';
import Killable from '../Traits/Killable';
import PendulumWalk from '../Traits/PendulumWalk';

class Behavior extends Trait{
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.pendulumWalk.speed = 0;
                us.killable.kill();
                them.stomper.bounce();
            } else {
                them.killable.kill();
            }
        }
    }
}

export function createPurpleFactory(sprites) {

    return function createPurple(x, y, reverse, pictures, deadPic) {
        const purple = new Entity('purple');

        purple.size.set(25, 15);
        //size was 76 => we are cutting 36 and move offset +36
        purple.pos.set(x, y);
        purple.vel.set(0, -600);
        purple.offset.y = 0;

        purple.pictures = reverse ? Array.from(pictures).reverse() : pictures;
        purple.picture = null;
        purple.deadPic = deadPic;

        purple.addTrait(new PendulumWalk());
        purple.addTrait(new Behavior());
        purple.addTrait(new Killable());

        sprites.entities.add(purple);
    };
}
