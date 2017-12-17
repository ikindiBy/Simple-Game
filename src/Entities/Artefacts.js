import Entity, {Sides, Trait} from '../Entity';
import Killable from '../Traits/Killable';

class Behavior extends Trait{
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            us.killable.removeAfter = 0;

            if (us.name.includes('coin')) {
                us.killable.kill();
                them.stateCosmo.coins++;
                them.sounds.playSound('getCoin');
            } else if (us.name.includes('key')) {
                us.killable.kill();
                them.stateCosmo.keys++;
                them.sounds.playSound('getCoin');
            } else if (us.name.includes('lock')) {
                if (them.stateCosmo.keys) {
                    us.killable.kill();
                    them.sounds.playSound('openLocks');
                    them.stateCosmo.locks++;
                    them.stateCosmo.keys--;
                    console.log('congratulation - next level');
                } else {
                    console.log('take a key');
                }
            }
        }
    }
}

export function createArtefactsFactory(sprites) {

    return function createArtefact(name, posX, posY) {

        const artefact = new Entity(name);
        artefact.size.set(23, 23);               //!!! resolve
        artefact.pos.set(posX * 37, posY * 37);  //!!! resolve
        artefact.offset.set(7, 7);
        artefact.picture = name;

        artefact.addTrait(new Killable());
        artefact.addTrait(new Behavior());
        sprites.entities.add(artefact);
    };
}
