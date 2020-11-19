import { Common } from './Common.esm.js';
import { media } from './Media.esm.js';


const GAME_SCREEN_ID = 'js-game-screen';
export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 480;

class Canvas extends Common {
    constructor() {
        super(GAME_SCREEN_ID);
        this.configureCanvas();
    }
    configureCanvas() {
        // sprawdź czy ta metoda powstanie później
        this.context = this.element.getContext('2d');
        this.context.canvas.width = CANVAS_WIDTH;
        this.context.canvas.height = CANVAS_HEIGHT;
        this.context.font = '20px Arial White';
        this.context.fillStyle = 'white';
    }
    // przekazujemy tutaj obiekt. points to win powinno być ukryte przed dostepem. 
    drawGameOnCanvas(gameState) {
        this.drawBackground();
        this.drawTextOnCanvas(gameState.pointsToWin, 92);
        this.drawTextOnCanvas(gameState.getPlayerPoints(), 163);
        this.drawTextOnCanvas(gameState.getLeftMovement(), 234);

    }

    drawBackground() {
        this.context.drawImage(media.backgroundImage, 0, 0);
    }
    // to jest korzystanie z API canvasa. To jego metoda fillText. Liczby obok, to X. Y (położenie na płótnie)

    drawTextOnCanvas(textToWrite, coordinateY) {
        this.context.fillText(`${textToWrite}`, 520, coordinateY);
    }


}


export const canvas = new Canvas();


// potencjalne ulepszenie - możliwe byłoby dodanie obiektu klasy konfiguracyjnej której właściwości moglibyśmy pobrać i przypisać do canvasa.