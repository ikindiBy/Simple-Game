import Entity, {Sides} from '../Entity';
import Jump from '../Traits/Jump';
import Go from '../Traits/Go';

const SLOW_DRAG = 1/2000;
const FAST_DRAG = 0;

export function createGreenFactory(sprites) {

    return function createGreen(x, y, reverse) {
        const green = new Entity();

        green.size.set(26, 40);
        //size was 76 => we are cutting 36 and move offset +36
        green.pos.set(x, y);
        green.vel.set(0, -600);
        green.offset.y = 33;

        green.pictures = reverse ? ['green-l', 'green-s'] : ['green-s', 'green-l'];
        green.picture = null;

        green.addTrait({
            name: 'walk',
            speed: 30,
            obstruct(entity, side) {
                if (side === Sides.LEFT || side === Sides.RIGHT) {
                    this.speed = -this.speed;
                }
            },
            update(green) {
                green.vel.x = this.speed;

                const sequence = Math.floor(green.lifetime % 2);
                green.picture = green.pictures[sequence];
            }
        });

        sprites.entities.add(green);

        return green;
    };
}
