
export class Task {
    constructor(id) {
        this.taskName = null;
        this.identify = id;
    }
    #border = document.querySelector('[data-allTasks]');



    pushNameOfTask = () => this.taskName;

    addTask() {
        let taskText = document.querySelector('[data-addInput]').value;
        // document.querySelector('[data-addInput]').value = ""; czyści zawartość inputa

        if (taskText == "") {
            return alert('Nie podałeś wartości lub nie została zrozumiana');
        }
        this.taskName = taskText;

        this.#showOnScreen(this.taskName);
    }

    removeTask(e) {
        e.target.parentNode.remove();
    }

    // #showAdditionalInfo(ID) {}

    #generateElement(name) {
        const element = `<div class = "container" data-container${this.identify}><div class = "task" data-task${this.identify}><p>${name}</p></div><button class = "deleteBtn" data-deleteButton${this.identify}>Usuń zadanie</button></div>`;
        return element;
    }

    #showOnScreen(taskName) {
        this.#border.insertAdjacentHTML('beforeend', this.#generateElement(taskName));
        document.querySelector(`[data-deleteButton${this.identify}]`).addEventListener('click', this.removeTask);
        // document.querySelector(`[data-task${this.identify}]`).addEventListener('click', this.#showAdditionalInfo(this.identify));
    }

}

