import drawField from './game-field';
import {loadImage,loadJSON} from './loaders';
import Sprite from './Sprite';
import Font from './Font';
import createLevelCompositor from './createLevelCompositor';
import drawStartMenu from './drawStartMenu';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.setAttribute('width', 960);
canvas.setAttribute('height', 629);

const game = Promise.all([
    loadImage('./images/sprites.png'),
    loadJSON('./sprites'),
    loadJSON('./alphabet'),
    loadImage('./images/alphabet.png')
])
.then(async ([tileImage, tileData, fontData, fontImage]) => {

    const sprites = new Sprite(tileImage, tileData);
    for (let sprite in tileData) {
        sprites.define(sprite);
    }

    const font = new Font(fontImage, fontData);
    for (let letter in fontData) {
        font.define(letter);
    }

    drawStartMenu(context, sprites, font);

    const start = function(event) {
        if (event.key === 'Enter') {
            window.removeEventListener('keypress', start);

            game.then(([sprites, font]) => {
                drawField(context, sprites);
            })
        }
    }

    window.addEventListener('keypress', start);

    return [sprites, font];
})
