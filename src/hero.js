import drawField from './game-field';

export default function(sprites, bg, context, canvas) {
    sprites.draw('boy1', context, 64);

    const pos = {
        x: 120,
        y: 516
    }

    function update() {
        
        sprites.draw('boy1', context, pos.x, pos.y);
        pos.x++;
        pos.y--;
        if (pos.y > 0) {
            requestAnimationFrame(update);
        }
    }
    update();
}
