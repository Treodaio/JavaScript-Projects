
export class Task {
    // constructor will be necessary. Any of new task must have ours properties.

    constructor() {
        this.taskName = addTask();
    }
    returnTaskName = () => taskName;

    addTask() {
        const taskText = document.querySelector('[data-addInput]').value;

        if (taskText == "") {
            return alert('Nie podałeś wartości lub nie została zrozumiana');
        }
        // call function here named generate task
        this.taskName = taskText;
        console.log(this.taskName);
    }

}