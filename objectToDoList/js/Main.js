import { Task } from './Task.js';
import { Search } from './Search.js';



class Main {
    adInput = document.querySelector('[data-addInput]');
    adButton = document.querySelector('[data-addTask]');
    search = new Search();

    // simple solution. Main disadvantage of that is growing memory consuming.
    numbersOfTasks = [];


    addListeners() {
        // event listener on adInput does not recognized any mouse event except click. I'm not sure why.
        // this.adInput.addEventListener('onmousedown', () => {
        //     console.log('click!');
        // });
        this.adButton.addEventListener('click', () => {
            this.numbersOfTasks.push(this.numbersOfTasks.length);

            this.taskObject = new Task(this.numbersOfTasks.length);
            this.taskObject.addTask();
            this.search.getNewItem(this.taskObject.pushNameOfTask(), this.numbersOfTasks.length);

        });

    }

}

const mainObject = new Main();
mainObject.addListeners();
