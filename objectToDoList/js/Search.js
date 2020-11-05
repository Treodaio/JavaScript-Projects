

export class Search {


    listOfTasks = [];
    returnTasks = () => this.listOfTasks;
    #searched = document.querySelector('[data-results]');

    getNewItem(name, ID) {
        this.listOfTasks.push({ name, ID });
    }



    #showTasks(value) {
        const taskArray = value;
        taskArray.forEach(task => {
            const element = `<div class = "searched" data-searched${task.ID}><p>{${task.name}}</p></div>`;
            this.#searched.insertAdjacentHTML('beforeend', element);
        })
    }

    searchForTask(event, tasks) {
        const userType = event.target.value.toLowerCase();
        console.log(userType);

        const taskArray = tasks;
        // console.log(taskArray);

        // ------KOMENTARZ 1------
        const searchList = taskArray.filter(item => item.name.toLowerCase().includes(userType));
        this.#showTasks(searchList);
    }


}

// ------KOMENTARZ 1------
//interesujący bug. jeżeli dodamy kilka spacji a następnie przeskoczymy do wyrazu i skasujemy go a następnie zaczniemy
//pisać ponownie, powstałe wcześniej spacje uniemożliwią wyszukanie czegokolwiek. Koniecznym byłobuy usuwanie spacji powstałych za ostatnim wyrazem.