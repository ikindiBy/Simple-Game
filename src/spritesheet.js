export default class spriteSheet {
    constructor(image, data) {
        this.image = image;
        this.data = data;
    }
    draw(context, name, posx, posy){
        const png = this.data[`${name}`].frame;
        context.drawImage(this.image, png['x'], png['y'], png['w'], png['h'],
                                      posx,     posy,     png['w'], png['h']);
    }
}
