

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




}

export const media = new Media();
