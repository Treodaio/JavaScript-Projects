class Media {
    constructor() {
        this._backgroundImage = null;
        this._diamondsSprite = null;

        this.musicVolume = 0.3;
        this.soundVolume = 0.3;

        this.allowedMusic = true;
        this.allowedSound = true;

        this._swapSound = null;
        this._backgroundMusic = null;
        this.isInLevel = false;
    }


    set backgroundImage(imageObject) {
        if (!imageObject instanceof Image) {
            console.log('Nie przekazano obrazka do klasy Media.');
            return;
        }
        this._backgroundImage = imageObject;
    }
    get backgroundImage() {
        return this._backgroundImage;
    }

    set diamondsSprite(imageObject) {

        if (!imageObject instanceof Image) {
            console.log('Nie przekazano obrazka do klasy Media.');
            return;
        }
        this._diamondsSprite = imageObject;
    }

    get diamondsSprite() {
        return this._diamondsSprite;
    }

    set swapSound(sound) {
        this._swapSound = sound;
        this._swapSound.volume = this.soundVolume;
    }

    set backgroundMusic(music) {
        this._backgroundMusic = music;
        this._backgroundMusic.volume = this.musicVolume;
    }

    // this getters returns boolean
    get swapSound() {
        return !!this._swapSound;
    }

    get backgroundMusic() {
        return Boolean(this._backgroundMusic);
    }








    playBackgroundMusic() {
        if (!this.allowedMusic || !this.backgroundMusic) { return; }

        this._backgroundMusic.loop = true;
        this._backgroundMusic.play();
    }

    stopBackgroundMusic() {
        if (this._backgroundMusic) { this._backgroundMusic.pause(); }
    }

    playSwapSound() {
        if (!this.allowedSound) { return; }
        if (this.swapSound) { this._swapSound.play(); }
    }

    increaseMusicVolume() {
        this.musicVolume += 0.1;
        if (this.musicVolume > 1) { this.musicVolume = 1; }
        if (this._backgroundMusic) { this._backgroundMusic.volume = this.musicVolume; }
    }

    decreaseMusicVolume() {
        this.musicVolume -= 0.1;
        if (this.musicVolume < 0) { this.musicVolume = 0; }
        if (this._backgroundMusic) { this._backgroundMusic.volume = this.musicVolume; }
    }

    increaseSoundVolume() {
        this.soundVolume += 0.1;
        if (this.soundVolume > 1) { this.soundVolume = 1; }
        if (this._swapSound) { this._swapSound.volume = this.soundVolume; }
    }

    decreaseSoundVolume() {
        this.soundVolume -= 0.1;
        if (this.soundVolume < 0) { this.soundVolume = 0; }
        if (this._swapSound) { this._swapSound.volume = this.soundVolume; }
    }

    toggleMusicOnOff() {
        if (this.allowedMusic) {
            this.allowedMusic = false;
            this.stopBackgroundMusic();
        } else {
            this.allowedMusic = true;
            this.playBackgroundMusic();
        }
    }

    toggleSoundOnOff() {
        if (this.allowedSound) {
            this.allowedSound = false;
        } else {
            this.allowedSound = true;
        }
    }
}

export const media = new Media();
