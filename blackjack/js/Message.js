

export class Message {
    constructor(element) {
        this.element = element;
    }

    setText(message) {
        this.element.innerHTML = message;
        return this;
    }

    show() {
        this.element.style.display = "block";

    }

    hide() {
        this.element.style.display = "hidden";
    }
}