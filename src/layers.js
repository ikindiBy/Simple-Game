export function createCollisionLayer(sprites) {

    const resolvedTiles = [];

    const tileResolver = sprites.tileCollider.tiles;
    const tileSize = tileResolver.tileSize

    const getByIndexOriginal = tileResolver.getByIndex;

    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x,y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollisions(context) {

        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({x,y}) => {
            context.beginPath();
            context.rect(x * tileSize,
                         y * tileSize,
                         tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = 'red';
        sprites.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x,  entity.pos.y,
                         entity.size.x, entity.size.y);
            context.stroke();
        })

        resolvedTiles.length = 0;
    };
}
