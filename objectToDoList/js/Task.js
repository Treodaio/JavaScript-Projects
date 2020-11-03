
export class Task {
    constructor() {
        this.taskName = null;
    }

    pushNameOfTask = () => this.taskName;

    #border = document.querySelector('[data-allTasks]');

    addTask() {
        let taskText = document.querySelector('[data-addInput]').value;
        // document.querySelector('[data-addInput]').value = ""; czyści zawartość inputa

        if (taskText == "") {
            return alert('Nie podałeś wartości lub nie została zrozumiana');
        }
        this.taskName = taskText;

        this.#showOnScreen(this.taskName);
    }

    #generateElement(name) {
        const element = `<div class = "container"><div class = "task" data-task><p>${name}</p></div> <button class = "deleteBtn" data-deleteButton>Usuń zadanie</button></div>`;
        return element;
    }

    #showOnScreen(taskName) {
        this.#border.insertAdjacentHTML('beforeend', this.#generateElement(taskName));
    }

}

