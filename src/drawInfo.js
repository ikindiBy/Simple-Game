
export function showGameOver(sprites) {
    const buffer = sprites.tiles.get(`bg.png`)[0];

    return function(context) {
        context.drawImage(buffer, 0, 0, 960, 629);

        context.font = "50px Verdana";
        context.strokeStyle = "red";
        context.strokeText(`GAME OVER`, 320, 210);
        context.strokeText(`PRESS RESTART BUTTON`, 170, 310);
        context.strokeText(`Key "R"`, 380, 410);
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
        context.fillText(`no more levels`, 10, 570);
        context.fillText(`key "R" to restart`, 10, 600);
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

export function drawPauseScreen() {
    const buffer = document.createElement('canvas');
    const context = buffer.getContext('2d');
    buffer.setAttribute('width', 960);
    buffer.setAttribute('height', 629);

    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillRect(0, 0, 960, 629);

    context.lineWidth = 40;
    context.strokeStyle = "red";

    context.strokeStyle = "rgba(222, 22, 220, 0.5)";

    context.beginPath();
    context.moveTo(420, 250);
    context.lineTo(420,370);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(500, 250);
    context.lineTo(500,370);
    context.stroke();

    context.font = "40px Verdana";
    context.fillStyle = "rgba(222, 22, 220, 0.4)";
    context.fillText(`press "P" to play`, 20, 600);

    return function showPause(context) {
        context.drawImage(buffer, 0, 0);
    }
}
