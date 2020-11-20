import { Common, VISIBLE_SCREEN } from './Common.esm.js';
import { canvas } from './Canvas.esm.js';
import { gameLevels } from './gameLevels.esm.js';
import { DATA_LOADED_EVENT_NAME, loader } from './Loading.esm.js';
import { Diamond } from './Diamonds.esm.js';
import { media } from './Media.esm.js';

export const GAME_BOARD_X_OFFSET = 40;
export const GAME_BOARD_Y_OFFSET = -5;

// how to hide properties on object using clousures
const gameState = {
    pointsToWin: 7000,
    getPlayerPoints: () => 1000,
    getLeftMovement: () => 30,
};

class Game extends Common {
    constructor() {
        super();

    }


    playLevel(level) {
        window.removeEventListener(DATA_LOADED_EVENT_NAME, this.playLevel)
        // pierwsza plansza ma zerowy index
        const levelInfo = gameLevels[level - 1];
        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
        this.diamond = new Diamond(50, 50, 1, 1, 2, media.diamondsSprite);
        this.animate();
    }

    animate() {
        canvas.drawGameOnCanvas(gameState);
        this.diamond.draw();
        this.animationFrame = window.requestAnimationFrame(() => this.animate());
    }
}

export const game = new Game(); 