import Spritesheet from './spritesheet';
import {loadImage,loadJSON} from './loaders';
import Background from './background';

export default function drawField(context, canvas) {

    loadImage('./images/sprites.png').then(image => {

        loadJSON('./sprites').then( data => {
            const sprites = new Spritesheet(image, data, canvas);

            for (let i in data) {
                sprites.define(i)
            }

            sprites.drawGround(`box-b`, 0);
            sprites.drawGround(`box-gb1`, 0.5);
        });
    });

    loadImage('./images/bg.png').then( bgImage => {
        const bg = new Background(bgImage, canvas);
        bg.define();
        bg.draw(context);
    });
}
