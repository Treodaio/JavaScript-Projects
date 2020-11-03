
export class Task {
    constructor(id) {
        this.taskName = null;
        this.identify = id;
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
    #removeTask(e) {
        e.target.parentNode.remove();
    }

    #generateElement(name) {
        const element = `<div class = "container" data-container${this.identify}><div class = "task" data-task><p>${name}</p></div> <button class = "deleteBtn" data-deleteButton${this.identify}>Usuń zadanie</button></div>`;
        return element;
    }

    #showOnScreen(taskName) {
        this.#border.insertAdjacentHTML('beforeend', this.#generateElement(taskName));
        document.querySelector(`[data-deleteButton${this.identify}]`).addEventListener('click', this.#removeTask);
    }

}

