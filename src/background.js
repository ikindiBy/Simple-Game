export default class background {
    constructor(image, canvas) {
        this.image = image;
        this.canvas = canvas;
        this.buffer = null;
    }
    define(){
        const buffer = document.createElement('canvas');
        const context = buffer.getContext('2d');
        buffer.setAttribute('width', this.canvas.width);
        buffer.setAttribute('height', this.canvas.height);
        context.drawImage(this.image, 0, 0);
        this.buffer = buffer;
    }
    draw(context) {
        context.drawImage(this.buffer, 0, 0);
    }
}
