
import { Search } from './Search.js';


export class Info extends Search {
    constructor() {
        super();
    }
    showSomething() {
        console.log(this.listOfTasks);
    }

}