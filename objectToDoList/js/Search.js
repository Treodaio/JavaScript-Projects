import { dataFlow } from "./dataFlow.js";


export class Search extends dataFlow {

    listOfTasks = [];
    returnTasks = () => this.listOfTasks;

    #searched = document.querySelector('[data-results]');

    showTaskArray() {
        console.log(this.listOfTasks);
    }


    #showTasks(value) {
        const taskArray = value;
        taskArray.forEach(task => {
            const element = `<div class = "itemSearched" data-searched${task.ID}><p>${task.info}</p></div>`;
            this.#searched.insertAdjacentHTML('beforeend', element);
        })
    }
    // usuń wszystkie elementy wyszukiwania przed kolejnym wyszukiwaniem
    clearTasks() {
        document.querySelectorAll('.itemSearched').forEach((item, index) => item.remove(index)
        );
    }

    searchForTask(event) {
        this.clearTasks();
        const userType = event.target.value.toLowerCase();
        // comm1
        const searchList = this.listOfTasks.filter(item => item.info.toLowerCase().includes(userType));
        this.#showTasks(searchList);
    }

}


//comm1 -----> interesujący bug. jeżeli dodamy kilka spacji a następnie przeskoczymy do wyrazu i skasujemy go a następnie zaczniemy
//pisać ponownie, powstałe wcześniej spacje uniemożliwią wyszukanie czegokolwiek. Koniecznym byłobuy usuwanie spacji powstałych za ostatnim wyrazem.