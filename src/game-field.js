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

        const buffer = document.createElement('canvas');
        const bufferContext = buffer.getContext('2d');
        buffer.width = canvas.width;
        buffer.height = canvas.height;

        // const bg = new Background(bgImage, canvas);
        // bg.define();
        // bg.draw(bufferContext);

        const sprites = new Spritesheet(image, data, canvas);

        for (let i in data) {
            sprites.define(i)
        }

        bufferContext.drawImage(bgImage, 0, 0);
        sprites.drawGround(`box-b`, bufferContext, 0, `initial`);
        sprites.drawGround(`box-gb1`, bufferContext, 0.5);

        return [buffer, sprites, bgImage];
    });
}
