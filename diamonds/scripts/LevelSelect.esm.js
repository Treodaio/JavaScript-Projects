import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from './Common.esm.js';
import { canvas } from './Canvas.esm.js';
import { loader, DATA_LOADED_EVENT_NAME } from './Loading.esm.js';
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
const LEVEL_SELECT_BUTTON_ID = 'level-select__button';
const LEVEL_SELECT_ID = 'js-level-select-screen';

class LevelSelect extends Common {
    constructor() {
        super(LEVEL_SELECT_ID);
        gameLevels.forEach(gameLevel => this.createButton(gameLevel.level));
    }

    createButton(level) {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add(LEVEL_SELECT_BUTTON_ID);
        button.textContent = level;
        button.addEventListener('click', event => this.buttonOnclickHandler(event))

        this.element.insertAdjacentElement("beforeend", button);
    }

    buttonOnclickHandler(event) {
        // odpowiada za ukrycie aktualnego poziomu. pokazujemy canvasa
        this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
        // this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);  // pokaż canvasa. ta jest prawdopdobnie niepotrzebna
        this.loadLevel(event.currentTarget.value); // załaduj wybrany poziom. 
    }


    loadLevel(level) {
        // korzystamy z settera obiektu media
        media.backgroundImage = loader.loadImage('images/levelbackground.png');
        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
        window.addEventListener(DATA_LOADED_EVENT_NAME, () => { game.playLevel(level); })
    }

}

export const levelSelect = new LevelSelect();