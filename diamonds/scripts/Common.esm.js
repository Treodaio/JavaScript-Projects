export const HIDDEN_CLASS = 'hidden';
export const HIDDEN_SCREEN = false;
export const VISIBLE_SCREEN = true;

// common js potrzebne jest każdej klasie która pracuje z elementem html - np. zmienia go. jeśli tak nie jest to nie musi z niego dziedziczyć

export class Common {
    constructor(elementID) {
        if (typeof elementID === 'undefined') return;
       
        this.element = this.bindToElement(elementID);
    }

    bindToElement(elementToFindByID) {
        const element = document.getElementById(elementToFindByID);
        if (!element) {
            throw new Error(`Nie znaleziono elementu ID: ${elementToFindByID}`);
        }
        return element;
    }

    changeVisibilityScreen(element, mode) {
        mode === VISIBLE_SCREEN ?
            element.classList.remove(HIDDEN_CLASS)
            : element.classList.add(HIDDEN_CLASS);
    }

}