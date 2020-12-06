import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from './Common.esm.js';
import { levelSelect } from './LevelSelect.esm.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './Canvas.esm.js';
import { settings } from './Settings.esm.js';


const START_SCREEN_ID = 'js-start-screen';
const START_SCREEN_GAME_BUTTON_ID = 'js-start-game';
const START_SCREEN_SETTINGS_BUTTON_ID = 'js-settings-button';

const MINI_SETTINGS_LAYER_ID = "js-mini-settings-layer";
const MINI_SETTINGS_BUTTON_ID = "js-mini-settings-button";
export const SCALE_PROPERTY = '--scale-value';

class MainMenu extends Common {
    constructor() {
        super(START_SCREEN_ID);
        this.bindToGameElements();
        this.resizeGameWindow();
        window.addEventListener('resize', this.resizeGameWindow);

    }

    bindToGameElements() {
        this.miniSettingsLayerElement = this.bindToElement(MINI_SETTINGS_LAYER_ID);

        const gameStartButton = this.bindToElement(START_SCREEN_GAME_BUTTON_ID);
        const gameSettingsButton = this.bindToElement(START_SCREEN_SETTINGS_BUTTON_ID);
        const miniSettingsButtonElement = this.bindToElement(MINI_SETTINGS_BUTTON_ID);

        gameStartButton.addEventListener('click', () => this.showLevelScreen());
        gameSettingsButton.addEventListener('click', () => this.showSettingsScreen());
        miniSettingsButtonElement.addEventListener('click', () => this.showSettingsScreen());
    }

    showLevelScreen() {
        levelSelect.createButtons();
        this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
        this.changeVisibilityScreen(levelSelect.element, VISIBLE_SCREEN);
    }

    showSettingsScreen() {
        this.changeVisibilityScreen(settings.element, VISIBLE_SCREEN);
    }

    resizeGameWindow() {
        const { innerWidth: width, innerHeight: height } = window;
        const scale = Math.min(width / CANVAS_WIDTH, height / CANVAS_HEIGHT);
        document.documentElement.style.setProperty(SCALE_PROPERTY, scale);
    }
}

export const mainMenu = new MainMenu();
