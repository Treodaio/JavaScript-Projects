import { Task } from './Task.js';
import { Search } from './Search.js';



class Main {

    adInput = document.querySelector('[data-addInput]');

    adButton = document.querySelector('[data-addTask]');
    search = new Search();

    addListeners() {
        // event listener on adInput does not recognized any mouse event except click. I'm not sure why.
        // this.adInput.addEventListener('onmousedown', () => {
        //     console.log('click!');
        // });

        this.adButton.addEventListener('click', () => {
            this.taskObject = new Task();
            this.taskObject.addTask();
            this.search.getNewItem(this.taskObject.pushNameOfTask());
        });

    }

}

const mainObject = new Main();
mainObject.addListeners();
