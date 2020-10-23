import { UI } from './UI.js'


export class Timer extends UI {
    #element = null;
    numberOfSeconds = 0;
    #maxNumberOfSeconds = 999;
    #interval = null;
    init() {
        this.#element = this.getElement(this.UiSelectors.timer);
    }

    startTimer() {
        this.#interval = setInterval(() => this.updateTimer(), 1000);
    }

    stopTimer() {
        clearInterval(this.#interval);
    }


    updateTimer() {
        this.numberOfSeconds++;

        this.numberOfSeconds <= this.#maxNumberOfSeconds ?
            this.#showTimerValueOnScreen(this.numberOfSeconds) : this.stopTimer();


    }


    #showTimerValueOnScreen(seconds) {
        this.#element.textContent = seconds;
    }

}