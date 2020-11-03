

export class Search {


    listOfTasks = [];
    delButton = null;
    returnID = () => this.delButton;

    getNewItem(name) {
        const newName = name;
        const identifier = this.listOfTasks.length + 1;
        this.listOfTasks.push({ name, identifier });
        console.log(this.listOfTasks);
        this.delButton = identifier;
    }


}