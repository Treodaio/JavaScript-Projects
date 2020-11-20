

class Media {
    constructor() {
        this._backgroundImage = null;
        this._diamondsSprite = null;
    }


    set backgroundImage(imageObject) {

        // ustawienie zabezpieczeń przed przypisaniem
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


}

export const media = new Media();
