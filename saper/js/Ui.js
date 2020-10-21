export class UI {
    // obiekt w którym trzymamy selektory potrzebne w naszej grze. 
    UiSelectors = {
        board: '[data-board]',
        cell: '[data-cell]',
    };
    getElement(selector) {
        return document.querySelector(selector);
    }
    getElements(selector) {
        return document.querySelectorAll(selector);
    }
}


