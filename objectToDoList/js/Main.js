import { Task } from './Task.js';


class Main {
    // constructor() { }
    taskObject = new Task();
    adButton = document.querySelector('[data-addTask]');

    init() {
        this.adButton.addEventListener('click', this.taskObject.addTask);
    }


}

const main = new Main();
main.init();
