import {Matrix} from './math';
import TileCollider from './TileCollider';
import Camera from './Camera';

export default class Spritesheet {
    constructor(image, data, canvas, layout) {
        this.canvas = canvas;
        this.image = image;
        this.data = data;
        this.tiles = new Map();

        this.entities = new Set();
        this.tilesMatrix = new Matrix();
        this.tilesLayout = layout;

        this.tileCollider = new TileCollider(this.tilesMatrix);

        this.gravity = 2000;
        this.camera = new Camera();
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

    draw(name, context, x, y, tile) {
        const buffer = this.tiles.get(`${name}.png`);

        if (tile) {
            this.tilesMatrix.set(x, y, {
                'name': name
            });

            x = x * buffer.width;
            y = y * buffer.width;
        }

        context.drawImage(buffer, x - this.camera.pos.x, y - this.camera.pos.y);
    }

    drawTiles(name, context, x1, x2, y1, y2) {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                this.draw(name, context, x, y, 'tile');
            }
        }
    }


    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime;
        });
    }
}
