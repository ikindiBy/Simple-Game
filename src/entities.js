import Entity from './entity';
import Jump from './Traits/Jump';
import Go from './Traits/Go';

export function createCosmo(sprites) {
    const cosmo = new Entity();

    cosmo.size.set(37, 50);

    cosmo.pos.set(185, 420);
    cosmo.vel.set(0, -600);

    sprites.entities.add(cosmo);

    cosmo.addTrait(new Jump());
    cosmo.addTrait(new Go());

    return cosmo;
}
