export default class Spritesheet {
    constructor(image, data) {
        this.image = image;
        this.data = data;
        this.tiles = new Map();
    }
    define(name) {
        const buffer = document.createElement('canvas');
        const context = buffer.getContext('2d');

        const png = this.data[`${name}`].frame;

        buffer.width = png['w'];
        buffer.height =png['h'];

        context.drawImage(this.image, png['x'], png['y'], png['w'], png['h'],
                                      0,        0,        png['w'], png['h']);

        this.tiles.set(name, buffer);
    }
    draw(name, context, x, y){
        const buffer = this.tiles.get(`${name}.png`);
        context.drawImage(buffer, x, y);
    }
}
