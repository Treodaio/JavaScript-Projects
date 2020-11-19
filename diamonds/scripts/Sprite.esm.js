import { canvas } from './Canvas.esm.js';


export class Sprite {
    constructor(x, y, width, height, spritesImage, numberOfSprites = 1, offset = { x: 0, y: 0 }) {
        this.x = x;
        this.y = y;
        this.alpha = 255;
        this.width = width;
        this.height = height;
        this.offset = { ...offset };
        this.spritesImage = spritesImage;
        this.numberOfSprites = numberOfSprites;
    }

    // powiększenie obrazka - ratio
    draw(numberOfSprites = 0, ratio = 1) {
        if (numberOfSprites > this.numberOfSprites) return;

        if (this.alpha !== 255) {
            canvas.context.globalAlpha = this.alpha / 255;
        }
        // offset - o ile element ma się przesunąć od początku CANVASA
        // image ,sx, sy, swidth, sheight, dx ,dy, dwidth, dheight
        canvas.context.drawImage(
            this.spritesImage,
            this.numberOfSprites * this.width,
            0,
            this.width,
            this.height,
            this.x + this.offset.x,
            this.y + this.offset.y,
            this.width * ratio,
            this.height * ratio,
        );

        if (this.alpha !== 255) {
            canvas.context.globalAlpha = 1;
        }


    }
}
