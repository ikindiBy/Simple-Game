import Entity from '../Entity';

import Jump from '../Traits/Jump';
import Go from '../Traits/Go';
import Stomper from '../Traits/Stomper';
import Physics from '../Traits/Physics';
import Killable from '../Traits/Killable'
import Falling from '../Traits/Falling';
import StateCosmo from '../Traits/StateCosmo';
import Dashboard from '../Traits/Dashboard';

const SLOW_DRAG = 1/2000;
const FAST_DRAG = 1/5000;

export function createCosmoFactory(sprites) {

    function setTurboState(turtleOn) {
      this.go.dragFactor = turtleOn ? SLOW_DRAG : FAST_DRAG;
    }

    function setTurtleState(turboOn) {
      this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    return function createCosmo() {
        const cosmo = new Entity('cosmo');

        cosmo.player = true;

        cosmo.size.set(20, 50);

        cosmo.pos.set(185, 420);
        cosmo.vel.set(0, -600);
        cosmo.offset.set(9, 0);

        sprites.entities.add(cosmo);

        cosmo.addTrait(new Physics());
        cosmo.addTrait(new Jump());
        cosmo.addTrait(new Go());
        cosmo.addTrait(new Stomper());
        cosmo.addTrait(new Killable());
        cosmo.addTrait(new Falling());
        cosmo.addTrait(new StateCosmo());
        cosmo.addTrait(new Dashboard());


        cosmo.turboAndSlow = setTurboState;
        cosmo.slowAndTurbo = setTurtleState;

        return cosmo;
    };
}
