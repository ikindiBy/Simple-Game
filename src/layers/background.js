export default function drawBackground(sprites, layout) {
    const buffer = document.createElement('canvas');
    const bufferContext = buffer.getContext('2d');

    const width = 37 * 100;
    const height = 37 * 17;
    buffer.setAttribute('width', width);
    buffer.setAttribute('height', height);

    layout.backgrounds.forEach( tile => {
        const name = tile.name;
        const type = tile.type;

        tile.pos.forEach(range => {
            switch(range.length) {
                case 4: {
                    sprites.drawTiles(name, bufferContext, type, ...range);
                    break;
                }
                case 3: {
                    let [x, xLen, y] = range;
                    xLen += x;
                    sprites.drawTiles(name, bufferContext, type, x, xLen, y, (y + 1));
                    break;
                }
                case 2: {
                    const [x, y] = range;
                    sprites.drawTiles(name, bufferContext, type, x, (x + 1), y, (y + 1));
                    break;
                }
            }
        });

    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0 - sprites.camera.pos.x,
                                  0 - sprites.camera.pos.y);
    };
}
