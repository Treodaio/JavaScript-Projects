import { Task } from './Task.js';
import { Search } from './Search.js';



class Main {
    adInput = document.querySelector('[data-addInput]');
    adButton = document.querySelector('[data-addTask]');
    srInput = document.querySelector('[data-search]');

    search = new Search();

    // simple solution. Main disadvantage of that is growing memory consuming.
    numbersOfTasks = [];


    addListeners() {
        
        // this.adInput.addEventListener('mouseover', () => {
        //     if (this.adInput.value === "Treść zadania") this.adInput.value = "";
        // });

        this.adButton.addEventListener('click', () => {
            this.numbersOfTasks.push(this.numbersOfTasks.length);

            this.taskObject = new Task(this.numbersOfTasks.length);
            this.taskObject.addTask();
            this.search.getNewItem(this.taskObject.pushNameOfTask(), this.numbersOfTasks.length);
        });

        this.adInput.addEventListener('keypress', ({ keyCode }) => {
            if (keyCode != 13) {
                return;
            } else {
                this.numbersOfTasks.push(this.numbersOfTasks.length);
                this.taskObject = new Task(this.numbersOfTasks.length);
                this.taskObject.addTask();
                this.search.getNewItem(this.taskObject.pushNameOfTask(), this.numbersOfTasks.length);
            }
        });

        this.srInput.addEventListener('input', () => {
            this.search.searchForTask(this.srInput, this.search.returnTasks())
        }
        );
    }

}

const mainObject = new Main();
mainObject.addListeners();


// add here listener

