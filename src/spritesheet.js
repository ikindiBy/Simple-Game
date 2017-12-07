import {Layout} from './math';
import TileCollider from './TileCollider'

export default class Spritesheet {
    constructor(image, data, canvas) {
        this.image = image;
        this.data = data;
        this.units = new Map();

        this.availableHeight = canvas.height;
        this.availableWidth = canvas.width;
        this.canvas = canvas;

        this.entities = new Set();
        this.tiles = new Layout();

        this.tileCollider = new TileCollider(this.tiles);
    }

    define(name) {
        const buffer = document.createElement('canvas');
        const context = buffer.getContext('2d');

        const png = this.data[`${name}`].frame;
        buffer.width = png['w'];
        buffer.height = png['h'];

        context.drawImage(this.image, png['x'], png['y'], png['w'], png['h'],
                                      0,        0,        png['w'], png['h']);

        this.units.set(name, buffer);
    }

    draw(name, context, x, y){
        const buffer = this.units.get(`${name}.png`);
        if (!y) {
            y = this.availableHeight - buffer.height;
        }
        context.drawImage(buffer, x, y);
    }

    drawGround(name, context, offset, initial) {
        const png = this.units.get(`${name}.png`);
        if (!!initial) {
            this.availableHeight = this.canvas.height;
        }
            this.availableHeight -= png.height;

        const iterationCount = Math.ceil(this.availableWidth / png.width);

        //костыль для работы с коллизией (this.tiles)
        // const y = ((this.canvas.height - this.availableHeight) / png.height);

        const y = Math.floor(this.canvas.height / png.height)
                - ((this.canvas.height - this.availableHeight) / png.height);

        for (let i = 0 - offset; i < iterationCount; ++i) {
            context.drawImage(png, i * png.width, this.availableHeight);
            this.tiles.set(i, y, {
                'name': name
            });
        }
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            this.tileCollider.test(entity);
        });
    }
}
