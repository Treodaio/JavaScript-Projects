import { UI } from './UI.js';

export class Modal extends UI {
    infoText = '';
    buttonText = '';

    element = this.getElement(this.UiSelectors.modal);
    header = this.getElement(this.UiSelectors.modalHeader);
    button = this.getElement(this.UiSelectors.modalButton);

    toggleModal = () => {
        this.element.classList.toggle('hide');
    }
    setText() {
        this.header.textContent = this.infoText;
        this.button.textContent = this.buttonText;
    }
}