import { Common } from './Common.esm.js';
import { media } from './Media.esm.js';

export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 480;

const GAME_SCREEN_ID = 'js-game-screen';

class Canvas extends Common {
    constructor() {
        super(GAME_SCREEN_ID);
        this.configureCanvas();
    }

    configureCanvas() {
        this.context = this.element.getContext('2d');
        this.context.canvas.width = CANVAS_WIDTH;
        this.context.canvas.height = CANVAS_HEIGHT;
        this.context.font = '20px Arial White';
        this.context.fillStyle = 'white';
    }

    drawGameOnCanvas(gameState) {
        this.drawBackground();
        this.drawTextOnCanvas(gameState.pointsToWin, 92);
        this.drawTextOnCanvas(gameState.getPlayerPoints(), 163);
        this.drawTextOnCanvas(gameState.getLeftMovement(), 234);

    }

    drawBackground() {

        this.context.drawImage(media.backgroundImage, 0, 0);
    }

    drawTextOnCanvas(textToWrite, coordinateY) {
        this.context.fillText(`${textToWrite}`, 520, coordinateY);
    }


}


export const canvas = new Canvas();
