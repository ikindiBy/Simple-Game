import spriteSheet from './spritesheet';
import {loadImage,loadJSON} from './loaders';

export default function drawField(context, canvas) {

    loadImage('./images/sprites.png').then(image => {

        loadJSON('./sprites').then( sprite => {
            const sprites = new spriteSheet(image, sprite);
            // sprites.draw(context, `sky3.png`, 0, 0);
            // const allImg = [];
            // for (let i in sprites.data) {
            //     allImg.push(i);
            // }
            // allImg.forEach( (img, index) => {
            //     sprites.draw(context, `${img}`, index*20, index*20);
            // });
            for (let i = 0; i < canvas.width; ) {
                sprites.draw(context, `box-b.png`, i, canvas.height - 37);
                i += 37;
            }
            for (let i = 0; i < canvas.width; ) {
                sprites.draw(context, `box-gb1.png`, i, canvas.height - 74);
                i += 37;
            }
        });
    });
}
