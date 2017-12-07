import Entity from './entity';
import Velocity from './Traits/Velocity'
import Jump from './Traits/Jump';
import Go from './Traits/Go';

export function createCosmo() {
    const cosmo = new Entity();
    cosmo.size.set(37, 50);

    cosmo.addTrait(new Jump());
    // cosmo.addTrait(new Velocity());
    cosmo.addTrait(new Go());

    return cosmo;
}
