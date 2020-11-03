

export class Search {
    listOfTasks = [];


    getNewItem(name, ID) {
        this.listOfTasks.push({ name, ID });
        console.log(this.listOfTasks);
    }




}