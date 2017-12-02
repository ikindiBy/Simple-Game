import drawField from './game-field';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.setAttribute('width', '960');
canvas.setAttribute('height', '640');

drawField(context, canvas);
