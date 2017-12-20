import KeyboardListener from './keyboardState';

export default function setupKeyboard(cosmo) {
    const input = new KeyboardListener();

    input.addMapping('Space', keyState => {
        if (keyState) {
            cosmo.jump.start();
        } else {
            cosmo.jump.cancel();
        }
    });

    input.addMapping('ShiftLeft', keyState => {
        cosmo.slowAndTurbo(keyState);
    });

    input.addMapping('ControlLeft', keyState => {
        cosmo.turboAndSlow(keyState);
    });

    input.addMapping('ArrowRight', keyState => {
        cosmo.go.dir += keyState ? 1 : -1;
    });

    input.addMapping('ArrowLeft', keyState => {
        cosmo.go.dir += keyState ? -1 : 1;
    });

    input.addMapping('ArrowDown', keyState => {
        cosmo.vel.y += 150;
    });

    input.addMapping('ArrowUp', keyState => {
        if (keyState) {
            cosmo.jump.start();
        } else {
            cosmo.jump.cancel();
        }
    });

    return input;
}
