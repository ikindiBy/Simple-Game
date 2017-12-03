import Spritesheet from './spritesheet';
import {loadImage,loadJSON} from './loaders';

export default function drawField(context, canvas) {

    loadImage('./images/sprites.png').then(image => {

        loadJSON('./sprites').then( data => {
            const sprites = new Spritesheet(image, data);

            for (let i in data) {
                sprites.define(i)
            }

            sprites.draw(`box-b`, context, 0, 0);
        });
    });
}
