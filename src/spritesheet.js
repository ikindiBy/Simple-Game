export default class spriteSheet {
    constructor(image, data) {
        this.image = image;
        this.data = data;
    }
    draw(context, name, posx, posy){
        const png = this.data[`${name}`].frame;

        context.drawImage(this.image, png[0], png[1], png[2], png[3], posx, posy, png[2], png[3]);
    }
}
