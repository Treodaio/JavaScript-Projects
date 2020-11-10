import { dataFlow } from './dataFlow.js';

export class Info extends dataFlow {


    #name = document.querySelector('[data-name]');
    #note = document.getElementById('note');

    #activeTask = null;

    taskArray = [];
    extendTaskInfo = [];

    fillTaskArray(value) {
        this.taskArray = value;
    }

    showInfo(ID) {
        let value = ID;
        let index = this.findIndex(ID, this.taskArray);
        const element = this.taskArray[index].info;
        this.#name.innerHTML = "";
        this.#name.insertAdjacentHTML('beforeend', element);
        this.#activeTask = value;
    }



    addNote(e) {
        const text = this.#note.value;
        if (text === "") return alert("Nie wpisałeś żadnego tesktu");
        console.log(this.#activeTask);

        //  comm1 
        if (this.extendTaskInfo.length <= 0) {

            this.pushToArray(this.extendTaskInfo, this.#activeTask, text);

        } else {    //comm2

            const index = this.findIndex(this.#activeTask, this.extendTaskInfo);

            if (index !== -1) {
                const rightID = this.extendTaskInfo[index].ID;
                if (rightID === this.#activeTask) {

                    this.extendTaskInfo.splice(index, 1, { ID: this.#activeTask, info: text })
                    console.log(this.extendTaskInfo);
                    return;
                }
            } else {
                //comm3
                this.pushToArray(this.extendTaskInfo, this.#activeTask, text);
            }

        }

    }


    // comm1 ----> if it is not first push to table so table is empty
    //comm2 ----> if table is not empty, time for check does we have note on that task ID.)
    // comm3 ----> No note found for an ID equal to activeTask. We add ID for this for the first time


}

