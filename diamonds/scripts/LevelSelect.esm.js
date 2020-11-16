import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from './Common.esm.js';
import { canvas } from './Canvas.esm.js';
import { loader, DATA_LOADED_EVENT_NAME } from './Loading.esm.js';
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
        // odpowiada za ukrycie aktualnego poziomu i pokazanie planszy z grą.
        this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
        this.loadLevel(event.currentTarget.value);
    }


    loadLevel(level) {
        const background = loader.loadImage('images/levelbackground.png');
        window.addEventListener(DATA_LOADED_EVENT_NAME, () => {
            console.log('Załadowane wszystkie media');
        })
    }

}

export const levelSelect = new LevelSelect();