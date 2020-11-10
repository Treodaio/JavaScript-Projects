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
    // jeżeli wejdziesz na zadanie klikniesz szczegoly a nastepnie usuniesz zadanie to wciaż możesz dodać notatkę - rozwiazanie to wlaczenie klasy active jesli usuwamy klase.


    addRemoveListener(that, number) {
        const self = that;
        if (document.querySelector(`[data-deleteButton${number}]`) == null) return;


        document.querySelector(`[data-deleteButton${number}]`).addEventListener('click', (event) => {

            if (!this.leftBoard.classList.contains('active')) this.leftBoard.classList.add('active');

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

            const that = this;
            // this.searchObject.getNewItem(this.taskObject.pushNameOfTask(), this.numbersOfTasks.length); 

            this.searchObject.pushToArray(that.searchObject.listOfTasks, this.numbersOfTasks.length, this.taskObject.pushNameOfTask());

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
                const that = this;
                // this.searchObject.getNewItem(this.taskObject.pushNameOfTask(), this.numbersOfTasks.length);
                this.searchObject.pushToArray(that.listOfTasks, this.numbersOfTasks.length, this.taskObject.pushNameOfTask());


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

            const ID = e.target.parentNode.dataset.task;

            if (ID == undefined) return;

            this.leftBoard.classList.remove('active');


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

