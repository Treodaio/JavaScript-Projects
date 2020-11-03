import { Task } from './Task.js';


class Main {
    // constructor() { }

    adButton = document.querySelector('[data-addTask]');

    init() {
        this.adButton.addEventListener('click', () => {
            this.taskObject = new Task();
        });
    }


}

const main = new Main();
main.init();
