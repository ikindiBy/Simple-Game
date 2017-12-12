import Entity, {Sides} from '../Entity';
import Jump from '../Traits/Jump';
import Go from '../Traits/Go';

const SLOW_DRAG = 1/2000;
const FAST_DRAG = 0;

export function createGreenFactory(sprites) {

    return function createGreen() {
        const green = new Entity();

        green.size.set(26, 74);

        green.pos.set(200, 479);
        green.vel.set(0, -600);

        green.pictures = ['green-l', 'green-s'];
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
