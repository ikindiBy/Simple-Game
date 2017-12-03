export default class Spritesheet {
    constructor(image, data, canvas) {
        this.image = image;
        this.data = data;
        this.tiles = new Map();

        this.availableHeight = canvas.height;
        this.availableWidth = canvas.width;
        this.canvas = canvas;
    }

    define(name) {
        const buffer = document.createElement('canvas');
        const context = buffer.getContext('2d');

        const png = this.data[`${name}`].frame;
        buffer.width = png['w'];
        buffer.height = png['h'];

        context.drawImage(this.image, png['x'], png['y'], png['w'], png['h'],
                                      0,        0,        png['w'], png['h']);

        this.tiles.set(name, buffer);
    }

    draw(name, context, x, y){
        const buffer = this.tiles.get(`${name}.png`);
        context.drawImage(buffer, x, y);
    }

    drawGround(name, offset, initial) {
        const context = this.canvas.getContext('2d');
        const png = this.tiles.get(`${name}.png`);
        if (initial) {
            this.availableHeight = this.canvas.height;
        }

        const iterationCount = Math.ceil(this.availableWidth / png.width);

        for (let i = 0 - offset; i < iterationCount; ++i) {
            context.drawImage(png, i * png.width, this.availableHeight);
        }
    }
}
