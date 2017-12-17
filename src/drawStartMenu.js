
export default function drawStartMenu(context, sprites, font) {

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
