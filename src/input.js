import KeyboardListener from './keyboardState';

export default function setupKeyboard(entity) {
    const input = new KeyboardListener();

    input.addMapping('Space', keyState => {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping('ArrowRight', keyState => {
        entity.go.dir += keyState ? 1 : -1;
    });

    input.addMapping('ArrowLeft', keyState => {
        entity.go.dir += keyState ? -1 : 1;
    });

    return input;
}
