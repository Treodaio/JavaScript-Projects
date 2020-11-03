

export class Search {
    // constructor () {}
    listOfTasks = [];


    getNewItem(name) {
        const newName = name;
        const identifier = this.listOfTasks.length + 1;
        this.listOfTasks.push({ name, identifier });
        console.log(this.listOfTasks);
        this.delButton = identifier;
    }


}