import { Common } from './Common.esm.js';


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

}


export const canvas = new Canvas();


// potencjalne ulepszenie - możliwe byłoby dodanie obiektu klasy konfiguracyjnej której właściwości moglibyśmy pobrać i przypisać do canvasa.