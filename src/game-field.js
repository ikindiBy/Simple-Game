import Spritesheet from './spritesheet';
import {loadImage,loadJSON} from './loaders';
import Background from './background';

export default function drawField(context, canvas) {
    return Promise.all([
        loadImage('./images/sprites.png'),
        loadJSON('./sprites'),
        loadImage('./images/bg.png')
    ])
    .then(([image, data, bgImage]) => {
        const bg = new Background(bgImage, canvas);
        bg.define();
        bg.draw(context);

        const sprites = new Spritesheet(image, data, canvas);

        for (let i in data) {
            sprites.define(i)
        }

        sprites.drawGround(`box-b`, 0);
        sprites.drawGround(`box-gb1`, 0.5);

        return [sprites, bg];
    });
}
