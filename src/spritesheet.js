import {Layout} from './math';
import TileCollider from './TileCollider'

export default class Spritesheet {
    constructor(image, data, canvas) {
        this.image = image;
        this.data = data;
        this.tiles = new Map();

        this.availableHeight = canvas.height;
        this.availableWidth = canvas.width;
        this.canvas = canvas;

        this.entities = new Set();
        this.tilesLayout = new Layout();

        this.tileCollider = new TileCollider(this.tilesLayout);
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
        if (!y) {
            y = this.availableHeight - buffer.height;
        }
        context.drawImage(buffer, x, y);
    }

    drawGround(name, context, offset, initial) {
        const png = this.tiles.get(`${name}.png`);

        if (!!initial) {
            this.availableHeight = this.canvas.height;
        }
            this.availableHeight -= png.height;

        const iterationCount = Math.ceil(this.availableWidth / png.width);

        //костыль для работы с коллизией (this.tilesLayout)
        const y = Math.floor(this.canvas.height / png.height)
                - ((this.canvas.height - this.availableHeight) / png.height);

        for (let i = 0 - offset; i < iterationCount; ++i) {
            context.drawImage(png, i * png.width, this.availableHeight);
            // console.log('ground: ', i, y);
            if(offset === 0) {
                this.tilesLayout.set(i, y, {
                    'name': name
                });
            }
        }
    }

    drawSomething(name, context, x, y) {
        const png = this.tiles.get(`${name}.png`);

        context.drawImage(png, x, y);

        x = this.tileCollider.tiles.toIndex(x);
        y = this.tileCollider.tiles.toIndex(y);
        // console.log('something: ', x, y);

        this.tilesLayout.set(x, y, {
            'name': name
        });
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            // this.tileCollider.test(entity);
        });
    }
}
