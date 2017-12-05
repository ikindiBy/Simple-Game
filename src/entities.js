import Entity from './entity';
import Velocity from './Traits/velocity'
import Jump from './Traits/jump';

export function createCosmo() {
    const cosmo = new Entity();

    cosmo.addTrait(new Velocity());
    cosmo.addTrait(new Jump());

    return cosmo;
}
