import Entity from './entity';
import Jump from './Traits/Jump';
import Go from './Traits/Go';
import {createAnimation} from './animations';

const SLOW_DRAG = 1/2000;
const FAST_DRAG = 0;

export function createCosmo(sprites) {
    const cosmo = new Entity();

    cosmo.size.set(37, 50);

    cosmo.pos.set(185, 420);
    cosmo.vel.set(0, -600);

    sprites.entities.add(cosmo);

    cosmo.addTrait(new Jump());
    cosmo.addTrait(new Go());

    cosmo.turboAndSlow = function setTurboState(turtleOn) {
      this.go.dragFactor = turtleOn ? SLOW_DRAG : FAST_DRAG;
    }

    cosmo.slowAndTurbo = function setTurtleState(turboOn) {
      this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }    

    return cosmo;
}
