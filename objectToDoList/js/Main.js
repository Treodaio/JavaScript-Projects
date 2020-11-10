import { Task } from './Task.js';
import { Search } from './Search.js';
import { Info } from './Info.js';



class Main {

    adInput = document.querySelector('[data-addInput]');
    adButton = document.querySelector('[data-addTask]');
    srInput = document.querySelector('[data-search]');
    taskBoard = document.querySelector('[data-allTasks]');
    leftBoard = document.querySelector('[data-active]');
    #sendButton = document.querySelector('[data-addNote]');


    searchObject = new Search();
    infoObject = new Info();

    // simple solution. Main disadvantage of that is growing memory consuming.
    numbersOfTasks = [];

    // dobrze byloby dodac klase ktora rozszerzy search.js oraz INFo.js klasa odpowiedzialna za szukanie indeksów oraz puszowanie do tablic.


    addRemoveListener(that, number) {
        const self = that;
        if (document.querySelector(`[data-deleteButton${number}]`) == null) return;
        document.querySelector(`[data-deleteButton${number}]`).addEventListener('click', (event) => {
            self.taskObject.removeTask(event);
            self.searchObject.removeItem(number);
            self.infoObject.removeNote(number);
        })

    }

    addListeners() {
        // REMOVE START TEXT ON ADD LABEL 
        // this.adInput.addEventListener('mouseover', () => {
        //     if (this.adInput.value === "Treść zadania") this.adInput.value = "";
        // });

        // ADD TASK
        this.adButton.addEventListener('click', () => {
            this.numbersOfTasks.push(this.numbersOfTasks.length);
            this.taskObject = new Task(this.numbersOfTasks.length);
            const button = this.taskObject.addTask();
            this.searchObject.getNewItem(this.taskObject.pushNameOfTask(), this.numbersOfTasks.length);
            const that = this;
            this.addRemoveListener(that, this.numbersOfTasks.length);
        });

        // ADD TASK WITH THE KEY
        this.adInput.addEventListener('keypress', ({ keyCode }) => {
            if (keyCode != 13) {
                return;
            } else {
                this.numbersOfTasks.push(this.numbersOfTasks.length);
                this.taskObject = new Task(this.numbersOfTasks.length);
                const button = this.taskObject.addTask();
                this.searchObject.getNewItem(this.taskObject.pushNameOfTask(), this.numbersOfTasks.length);
                const that = this;
                this.addRemoveListener(that, this.numbersOfTasks.length);
            }
        });

        // SEARCH BAR
        this.srInput.addEventListener('input', (e) => {
            // this.search.searchForTask(this.srInput, this.search.returnTasks())
            this.searchObject.searchForTask(e);
        }
        );

        // SHOW INFO
        this.taskBoard.addEventListener('click', (e) => {
            if (e.target.parentNode.classList.contains('container')) return;
            this.leftBoard.classList.remove('active');
            const ID = e.target.parentNode.dataset.task;

            this.infoObject.fillTaskArray(this.searchObject.returnTasks());
            this.infoObject.showInfo(ID);
        })

        // ADD NOTE 
        this.#sendButton.addEventListener('click', (e) => {
            this.infoObject.addNote();
        })

    }

}

const mainObject = new Main();
mainObject.addListeners();

