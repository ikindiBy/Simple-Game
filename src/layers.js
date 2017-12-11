export function createCollisionLayer(sprites) {

    const resolvedTiles = [];

    const tileResolver = sprites.tileCollider.tiles;
    const tileSize = tileResolver.tileSize

    const getByIndexOriginal = tileResolver.getByIndex;

    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x,y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollisions(context, camera) {

        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({x,y}) => {
            context.beginPath();
            context.rect(x * tileSize - camera.pos.x,
                         y * tileSize - camera.pos.y,
                         tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = 'red';
        sprites.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x - camera.pos.x,
                         entity.pos.y - camera.pos.y,
                         entity.size.x, entity.size.y);
            context.stroke();
        })

        resolvedTiles.length = 0;
    };
}

export function drawBackground(sprites) {
    const buffer = document.createElement('canvas');
    const bufferContext = buffer.getContext('2d');

    const width = 37 * 100;
    const height = 37 * 17;
    buffer.setAttribute('width', width);
    buffer.setAttribute('height', height);

    sprites.tilesLayout.backgrounds.forEach( tile => {
        const name = tile.name;

        tile.pos.forEach(range => {
            switch(range.length) {
                case 4: {
                    sprites.drawTiles(name, bufferContext, ...range);
                    break;
                }
                case 3: {
                    let [x, xLen, y] = range;
                    xLen += x;
                    sprites.drawTiles(name, bufferContext, x, xLen, y, (y + 1));
                    break;
                }
                case 2: {
                    const [x, y] = range;
                    sprites.drawTiles(name, bufferContext, x, (x + 1), y, (y + 1));
                    break;
                }
            }
        });

    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0 + sprites.camera.pos.x,
                                  0 + sprites.camera.pos.y,
                                  960, 629,
                                  0,
                                  0,
                                  960, 629);
        // context.drawImage(buffer, 0 - sprites.camera.pos.x,
        //                           0 - sprites.camera.pos.y);
    };
}

export function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(cameraToDraw.pos.x - fromCamera.pos.x,
                     cameraToDraw.pos.y - fromCamera.pos.y,
                     cameraToDraw.size.x, cameraToDraw.size.y);
        context.stroke();
    }
}
