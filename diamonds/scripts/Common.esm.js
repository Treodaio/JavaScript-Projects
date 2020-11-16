export const HIDDEN_CLASS = 'hidden';
export const HIDDEN_SCREEN = false;
export const VISIBLE_SCREEN = true;


export class Common {
    constructor(elementID) {
        this.elemement = this.bindToElement(elementID);
    }

    bindToElement(elementToFindByID) {
        const element = document.getElementById(elementToFindByID);
        if (!element) {
            throw new Error(`Nie znaleziono elementu ID: ${elementToFindByID}`);
        }
        return element;
    }

    changeVisibilityScreen(element, mode) {
        mode === VISIBLE_SCREEN
            ? element.classList.remove(HIDDEN_CLASS)
            : element.classList.add(HIDDEN_CLASS);
    }

}