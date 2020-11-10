

export class Info {
    // name of element - data-name
    // dodawanie tekstu będzie realizowane za pomocą nowej tablicy. Tablica ta będzie zawierać obiekt o 2 właściwościach - wpisanym tekście oraz numerze identyfikującym czyli - data-task / (ID pobierane z taskArray?)

    #name = document.querySelector('[data-name]');
    #rightBoard = document.querySelector('[data-active]');
    #note = document.getElementById('note');
    #activeTask = null;

    taskArray = [];
    extendTaskInfo = [];

    fillTaskArray(value) {
        this.taskArray = value;
    }

    showInfo(ID) {
        let value = ID;
        let index = this.#findIndex(ID, this.taskArray);

        const element = this.taskArray[index].name;

        this.#name.innerHTML = "";
        this.#name.insertAdjacentHTML('beforeend', element);
        this.#activeTask = value;
    }


    #findIndex(value, where) {
        const index = where.findIndex(item => (item.ID == value));
        return index;
    }

    // w tej metodzie dobrze byłoby skorzystać z metody szukającej indexu - find index.
    addNote(e) {
        const text = this.#note.value;
        // jeżeli wpisany text jest pusty
        if (text === "") return alert("Nie wpisałeś żadnego tesktu");
        console.log(this.#activeTask);

        // if it is first push to table so table is empty
        if (this.extendTaskInfo.length <= 0) {
            this.extendTaskInfo.push({ ID: this.#activeTask, note: text })
            console.log(this.extendTaskInfo);
        } else {    //if table is not empty time for check does we have note on that task ID.)
            // stara wersja bez metody ----> const index = this.extendTaskInfo.findIndex(item => (item.ID == this.#activeTask));

            const index = this.#findIndex(this.#activeTask, this.extendTaskInfo);

            if (index !== -1) {
                const rightID = this.extendTaskInfo[index].ID;
                if (rightID === this.#activeTask) {

                    this.extendTaskInfo.splice(index, 1, { ID: this.#activeTask, note: text })
                    console.log(this.extendTaskInfo);
                    return;
                }
            } else {
                //No note found for an ID equal to activeTask. We add ID for this for the first time
                this.extendTaskInfo.push({ ID: this.#activeTask, note: text })
                console.log(this.extendTaskInfo);
            }

        }

    }

    removeNote(value) {
        const index = this.#findIndex(value, this.extendTaskInfo);
        const element = this.extendTaskInfo.splice(index, 1);
        console.log(this.extendTaskInfo);

    }

}

