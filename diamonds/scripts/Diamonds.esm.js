import { Sprite } from './Sprite.esm.js';
import { GAME_BOARD_X_OFFSET, GAME_BOARD_Y_OFFSET } from './gameLevels.esm.js';

const DIAMOND_ORIGINAL_SIZE = 32;
const NUMBER_OF_DIAMONDS_TYPES = 6;


export const DIAMOND_SIZE = 48;
const DIAMOND_ZOOM = DIAMOND_SIZE / DIAMOND_ORIGINAL_SIZE;


export class Diamond extends Sprite {

    constructor(x, y, row, column, kind, diamondsSpriteImage) {
        // przeniesienie offset poza konstruktor? tylko wtedy mozę sie nie wykonać jako pierwszy.
        const offset = {
            x: GAME_BOARD_X_OFFSET,
            y: GAME_BOARD_Y_OFFSET,
        };
        super(
            x,
            y,
            DIAMOND_ORIGINAL_SIZE,
            DIAMOND_ORIGINAL_SIZE,
            diamondsSpriteImage,
            NUMBER_OF_DIAMONDS_TYPES,
            offset);

        this.column = column;
        this.kind = kind;
        this.row = row;
        this.match = 0;

    }

    // wyższy poziom abstrakcji. klasa diamonds posiada swoją metodę draw która "przysłania" metodę klasy bazowej. Robi to poprzez wywołanie metody klasy nadrzędnej w ciele swojej metody. podajemy tam dane.

    // wywołanie metody z klasy bazowej
    draw() {
        super.draw(this.kind, DIAMOND_ZOOM);
    }

}