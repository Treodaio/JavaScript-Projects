import { Task } from './Task.js';
import { Search } from './Search.js';
import { Info } from './Info.js';



class Main {
    adInput = document.querySelector('[data-addInput]');
    adButton = document.querySelector('[data-addTask]');
    srInput = document.querySelector('[data-search]');

    search = new Search();
    objectInfo = new Info();

    // simple solution. Main disadvantage of that is growing memory consuming.
    numbersOfTasks = [];

    // data-deleteButton${this.identify}

    addRemoveListener(that, number) {
        const self = that;
        document.querySelector(`[data-deleteButton${number}]`).addEventListener('click', (event) => {
            self.taskObject.removeTask(event);
            self.search.removeItem(number);
        })

    }

    addListeners() {

        // this.adInput.addEventListener('mouseover', () => {
        //     if (this.adInput.value === "Treść zadania") this.adInput.value = "";
        // });


        document.querySelector('[data-allTasks]').addEventListener('click', (e) => {
            console.log(e.target.parentNode);
        })

        this.adButton.addEventListener('click', () => {
            this.numbersOfTasks.push(this.numbersOfTasks.length);
            this.taskObject = new Task(this.numbersOfTasks.length);
            const button = this.taskObject.addTask();
            this.search.getNewItem(this.taskObject.pushNameOfTask(), this.numbersOfTasks.length);
            const that = this;
            this.addRemoveListener(that, this.numbersOfTasks.length);
        });

        this.adInput.addEventListener('keypress', ({ keyCode }) => {
            if (keyCode != 13) {
                return;
            } else {
                this.numbersOfTasks.push(this.numbersOfTasks.length);
                this.taskObject = new Task(this.numbersOfTasks.length);
                const button = this.taskObject.addTask();
                this.search.getNewItem(this.taskObject.pushNameOfTask(), this.numbersOfTasks.length);
                const that = this;
                this.addRemoveListener(that, this.numbersOfTasks.length);
            }
        });

        this.srInput.addEventListener('input', (event) => {
            // this.search.searchForTask(this.srInput, this.search.returnTasks())
            this.search.searchForTask(event);
        }
        );

    }

}

const mainObject = new Main();
mainObject.addListeners();




