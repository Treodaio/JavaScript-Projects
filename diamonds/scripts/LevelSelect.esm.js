import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from './Common.esm.js';
import { loader, DATALOADED_EVENT_NAME } from './Loading.esm.js';
import { game } from './Game.esm.js';
import { media } from './Media.esm.js';
import { gameLevels } from './gameLevels.esm.js';
import { userData } from './UserData.esm.js';



const LEVEL_SELECT_ID = 'js-level-select-screen';
const LEVEL_SELECT_BUTTON_ID = 'level-select__button';

class LevelSelect extends Common {
    constructor() {
        super(LEVEL_SELECT_ID);
        this.createButtons();
    }

    createButtons() {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
        gameLevels.some(gameLevel => this.createButton(gameLevel.level));
    }

    // if user data will not return value, return true.That stops table iteration.
    createButton(value) {
        if (!userData.checkAvailabilityLevel(value)) {
            return true;
        }
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add(LEVEL_SELECT_BUTTON_ID);
        button.textContent = value;
        button.value = value;
        button.addEventListener('click', event => this.buttonOnclickHandler(event))
        this.element.insertAdjacentElement("beforeend", button);
    }

    buttonOnclickHandler(event) {
        this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
        // this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
        this.loadLevel(event.currentTarget.value);
    }

    loadLevel(level) {
        // using of media getters
        if (
            media.backgroundImage
            && media.diamondsSprite
            && media.backgroundMusic
            && media.swapSound
        ) {
            game.playLevel(level);
            return;
        }

        if (!media.diamondsSprite) {
            media.diamondsSprite = loader.loadImage('images/diamonds-transparent.png');
        }

        if (!media.backgroundImage) {
            media.backgroundImage = loader.loadImage('images/levelbackground.png');
        }

        if (!media.swapSound) {
            media.swapSound = loader.loadSound('sounds/stone_rock_or_wood_moved.mp3');
        }

        if (!media.backgroundMusic) {
            media.backgroundMusic = loader.loadSound('sounds/music-background.mp3');
        }
        // this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
        window.addEventListener(DATALOADED_EVENT_NAME, () => game.playLevel(level));
    }
}

export const levelSelect = new LevelSelect();