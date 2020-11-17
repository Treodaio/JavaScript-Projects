import { Common } from './Common.esm.js';
import { gameLevels } from './gameLevels.esm.js';
import { DATA_LOADED_EVENT_NAME, loader } from './Loading.esm.js';
import { canvas } from './Canvas.esm.js';

// how to hide properties on object
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
        window.removeEventListener(DATA_LOADED_EVENT_NAME, this.playLevel, false)
        // pierwsza plansza ma zerowy index
        const levelInfo = gameLevels[level - 1];
        this.animate();
    }

    animate() {
        console.log('Lets game!');
        canvas.drawGameOnCanvas(gameState);
        this.animationFrame = window.requestAnimationFrame(() => this.animate());
    }
}

export const game = new Game(); 