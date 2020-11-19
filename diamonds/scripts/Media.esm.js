

class Media {
    constructor() {

    }
    #backgroundImage = null;
    #diamondsSprite = null;

    set backgroundImage(imageObject) {

        // ustawienie zabezpieczeń przed przypisaniem
        if (!imageObject instanceof Image) {
            console.log('Nie przekazano obrazka do klasy Media.');
            return;
        }
        this.#backgroundImage = imageObject;
    }

    get backgroundImage() {
        return this.#backgroundImage;
    }



    set diamondsSprite(imageObject) {

        if (!imageObject instanceof Image) {
            console.log('Nie przekazano obrazka do klasy Media.');
            return;
        }
        this.#diamondsSprite = imageObject;

    }

    get diamondsSprite() {
        return this.#diamondsSprite;
    }


}

export const media = new Media();
