import field from './game-field';
import spriteSheet from './spritesheet';
import {loadImage,loadJSON} from './loaders';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.setAttribute('width', '960');
canvas.setAttribute('height', '640');


loadImage('./images/sprites.png').then(image => {

    loadJSON('./levels/1-1').then( sprite => {
        const sprites = new spriteSheet(image, sprite);
        console.log(sprites);
        sprites.draw(context, `sky3.png`, 0, 0);
    });

    // context.drawImage(image, 0, 0, 67, 33, 0, 0, 67, 33);
    // context.drawImage(image, 67, 0, 67, 33, 32, 38, 67, 33);
    //  position(x,y) + size(x,y) + positionOnCanvas(x,y) + sizeOnCanvas(x,y);
});
