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
            if (us.killable.dead) {
                return;
            }
            
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

export function createBlackFactory(sprites) {

    return function createBlack(x, y, reverse, pictures, deadPic) {
        const black = new Entity('black');

        black.size.set(25, 15);
        //size was 76 => we are cutting 36 and move offset +36
        black.pos.set(x, y);
        black.vel.set(0, -600);
        black.offset.y = 0;

        black.pictures = reverse ? Array.from(pictures).reverse() : pictures;
        black.picture = null;
        black.deadPic = deadPic;

        black.addTrait(new PendulumWalk());
        black.addTrait(new Behavior());
        black.addTrait(new Killable());

        sprites.entities.add(black);
    };
}
