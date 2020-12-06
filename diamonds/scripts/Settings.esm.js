import { Common, HIDDEN_SCREEN } from './Common.esm.js';
import { media } from './Media.esm.js';


const MUSIC_ON_OFF_BUTTON_ID = 'js-music-on-off';
const SOUND_ON_OFF_BUTTON_ID = 'js-sound-on-off';
const SETTINGS_EXIT_BUTTON_ID = 'js-settings-screen-exit-button';
const MUSIC_VOLUME_DECREASE_BUTTON_ID = 'js-music-volume-decrease';
const MUSIC_VOLUME_INCREASE_BUTTON_ID = 'js-music-volumne-increase';
const SOUND_VOLUME_INCREASE_BUTTON_ID = 'js-sound-volume-increase';
const SOUND_VOLUME_DECREASE_BUTTON_ID = 'js-sound-volume-decrease';

export const SETTINGS_SCREEN_ID = 'js-settings-screen';

class Settings extends Common {
    constructor() {
        super(SETTINGS_SCREEN_ID);
        this.bindToElements();
    }

    bindToElements() {
        const exitSettingsElement = this.bindToElement(SETTINGS_EXIT_BUTTON_ID);
        const musicOnOffElement = this.bindToElement(MUSIC_ON_OFF_BUTTON_ID);
        const musicVolumeUpElement = this.bindToElement(MUSIC_VOLUME_INCREASE_BUTTON_ID);
        const musicVolumeDownElement = this.bindToElement(MUSIC_VOLUME_DECREASE_BUTTON_ID);
        const soundOnOffElement = this.bindToElement(SOUND_ON_OFF_BUTTON_ID);
        const soundVolumeUpElement = this.bindToElement(SOUND_VOLUME_INCREASE_BUTTON_ID);
        const soundVolumeDownElement = this.bindToElement(SOUND_VOLUME_DECREASE_BUTTON_ID);

        exitSettingsElement.addEventListener('click', () => this.changeVisibilityScreen(this.element, HIDDEN_SCREEN));
        musicOnOffElement.addEventListener('click', () => media.toggleMusicOnOff());
        soundOnOffElement.addEventListener('click', () => media.toggleSoundOnOff());

        musicVolumeUpElement.addEventListener('click', () => media.increaseMusicVolume());
        musicVolumeDownElement.addEventListener('click', () => media.decreaseMusicVolume());
        soundVolumeUpElement.addEventListener('click', () => media.increaseSoundVolume());
        soundVolumeDownElement.addEventListener('click', () => media.decreaseSoundVolume());
    }
}


export const settings = new Settings();


