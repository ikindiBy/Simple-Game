export default function makeHero(buffer, sprites, bgImage, context) {
    sprites.draw('boy1', context, 64);

    console.log(buffer, sprites, bgImage, context);

    const pos = {
        x: 120,
        y: 516
    }

    function update() {
        context.drawImage(buffer, 0, 0);
        sprites.draw('boy1', context, pos.x, pos.y);
        pos.x++;
        pos.y--;
        if (pos.y > 0) {
            requestAnimationFrame(update);
        }
    }
    update();
}
