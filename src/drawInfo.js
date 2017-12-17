
export function showGameOver(sprites) {
    const buffer = sprites.tiles.get(`bg.png`)[0];

    return function(context) {
        context.drawImage(buffer, 0, 0, 960, 629);

        context.font = "50px Verdana";
        context.strokeStyle = "red";
        context.strokeText(`GAME OVER`, 320, 210);
        context.strokeText(`PRESS RESTART BUTTON`, 170, 310);
        context.strokeText(`Key "-"`, 420, 410);
    }
}

export function showCongratulations(sprites) {
    const buffer = sprites.tiles.get(`bg.png`)[0];

    return function(context) {
        context.drawImage(buffer, 0, 0, 960, 629);

        context.font = "50px Verdana";
        context.strokeStyle = "lightblue";
        context.strokeText(`CONGRATULATIONS`, 250, 320);

        context.font = "italic 25px Helvetica";
        context.fillStyle = "darkSlateBlue";
        context.fillText(`no more levels`, 10, 580);
        context.fillText(`key "-" to restart`, 10, 600);
    }
}

export function drawStartMenu(context, sprites, font) {
    
    sprites.draw('bg', context, 0, 0);
    font.print('PRESS', context, 150, 50, 60, 60);
    sprites.draw('boy1', context, 80, 210);
    sprites.draw('boy2', context, 120, 210);
    sprites.draw('boy3', context, 160, 210);
    sprites.draw('boy2', context, 200, 210);
    font.print('ENTER', context, 340, 208, 60, 60);
    sprites.draw('boy4', context, 780, 210);
    font.print('TO', context, 150, 350, 60, 60);
    font.print('START', context, 350, 450, 60, 60);

}
