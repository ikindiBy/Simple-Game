import drawField from './game-field';
import hero from './hero.js';

export default function(canvas, context) {
    const gameField = drawField(context, canvas);
    gameField.then(([bg, sprites]) => {
        hero(bg, sprites, context, canvas);
    });
}
