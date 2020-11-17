import { canvas } from './Common.esm.js';


export class Sprite {
    constructor(x, y, width, height, spritesImage, numberOfSprites = 1, offset = { x: 0, y: 0 }) {
        this.#x = x;
        this.#y = y;
        this.#alpha = 255;
        this.#width = width;
        this.#height = height;
        this.#offset = { ...offset };
        this.#spritesImage = spritesImage;
        this.#numberOfSprites = numberOfSprites;
    }

    // powiększenie obrazka - ratio
    draw(numberOfSprites = 0, ratio = 1) {
        if (numberOfSprites > this.#numberOfSprites) return;

        if (this.alpha !== 255) {
            canvas.context.globalAlpha = this.alpha / 255;
        }



        // znowu coś dziwnego
        if (this.alpha !== 255) {
            canvas.context.globalAlpha = 1;
        }


    }
}


