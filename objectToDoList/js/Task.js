
export class Task {
    constructor(id) {
        this.taskName = null;
        this.identify = id;
    }
    #board = document.querySelector('[data-allTasks]');

    pushRemovedTask = () => this.removedTaskArr;


    pushNameOfTask = () => this.taskName;

    addTask() {
        let taskText = document.querySelector('[data-addInput]').value;

        if (taskText == "") {
            return alert('Nie podałeś wartości lub nie została zrozumiana');
        }
        this.taskName = taskText;

        const button = this.#showOnScreen(this.taskName);
        return button;
    }

    removeTask(e) {
        e.target.parentNode.remove();
    }

    // #showAdditionalInfo(ID) {}

    generateElement(name) {
        const element = `<div class = "container" data-container${this.identify}><div class = "task" data-task${this.identify}><p>${name}</p></div><button class = "deleteBtn" data-deleteButton${this.identify}>Usuń zadanie</button></div>`;
        return element;
    }

    #showOnScreen(taskName) {
        const button = this.generateElement(taskName);
        this.#board.insertAdjacentHTML('beforeend', this.generateElement(taskName));
        return button;

        //-- informacje szczegółówe o zadaniu
        //  ----- document.querySelector(`[data-task${this.identify}]`).addEventListener('click', this.#showAdditionalInfo(this.identify));
    }

}

