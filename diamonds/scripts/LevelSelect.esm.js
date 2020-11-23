import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from './Common.esm.js';
import { canvas } from './Canvas.esm.js';
import { loader, DATALOADED_EVENT_NAME } from './Loading.esm.js';
import { game } from './Game.esm.js';
import { media } from './Media.esm.js';
const gameLevels = [
    {
        level: 1,
    },
    {
        level: 2,
    },
    {
        level: 3,
    },
];
const LEVEL_SELECT_ID = 'js-level-select-screen';
const LEVEL_SELECT_BUTTON_ID = 'level-select__button';

class LevelSelect extends Common {
    constructor() {
        super(LEVEL_SELECT_ID);
        gameLevels.forEach(gameLevel => this.createButton(gameLevel.level));
    }

    createButton(value) {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add(LEVEL_SELECT_BUTTON_ID);
        button.textContent = value;
        button.value = value;
        button.addEventListener('click', event => this.buttonOnclickHandler(event))
        this.element.insertAdjacentElement("beforeend", button);
    }


    // odpowiada za ukrycie aktualnego poziomu. pokazujemy canvasa
    buttonOnclickHandler(event) {
        this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);  // pokaż canvasa. ta jest prawdopdobnie niepotrzebna
        this.loadLevel(event.currentTarget.value);
    }


    loadLevel(level) {
        // korzystamy z settera obiektu media
        media.diamondsSprite = loader.loadImage('images/diamonds-transparent.png');
        media.backgroundImage = loader.loadImage('images/levelbackground.png');


        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
        window.addEventListener(DATALOADED_EVENT_NAME, () => game.playLevel(level));
    }

}

export const levelSelect = new LevelSelect();