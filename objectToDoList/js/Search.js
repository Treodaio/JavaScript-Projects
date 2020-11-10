import { dataFlow } from "./dataFlow.js";


export class Search extends dataFlow {

    listOfTasks = [];
    returnTasks = () => this.listOfTasks;

    #searched = document.querySelector('[data-results]');

    showTaskArray() {
        console.log(this.listOfTasks);
    }


    // usuń obiekt w tablicy listOfTasks którym właściwość ID jest równa parametrowi value
    removeItem(value) {
        const index = this.findIndex(value, this.listOfTasks);
        this.listOfTasks.splice(index, 1);
    }

    #showTasks(value) {
        const taskArray = value;
        taskArray.forEach(task => {
            const element = `<div class = "itemSearched" data-searched${task.ID}><p>${task.info}</p></div>`;
            this.#searched.insertAdjacentHTML('beforeend', element);
        })
    }
    // usuń wszystkie elementy wyszukiwania przed kolejnym wyszukiwaniem
    #clearTasks() {
        document.querySelectorAll('.itemSearched').forEach((item, index) => item.remove(index)
        );
    }

    searchForTask(event) {
        this.#clearTasks();
        const userType = event.target.value.toLowerCase();
        // ------KOMENTARZ 1------
        const searchList = this.listOfTasks.filter(item => item.info.toLowerCase().includes(userType));
        this.#showTasks(searchList);
    }

}

// ------KOMENTARZ 1------
//interesujący bug. jeżeli dodamy kilka spacji a następnie przeskoczymy do wyrazu i skasujemy go a następnie zaczniemy
//pisać ponownie, powstałe wcześniej spacje uniemożliwią wyszukanie czegokolwiek. Koniecznym byłobuy usuwanie spacji powstałych za ostatnim wyrazem.