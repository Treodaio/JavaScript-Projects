export class dataFlow {

    findIndex(value, arr) {
        const index = arr.findIndex(item => (item.ID == value));
        return index;
    }

    pushToArray(arr, newID, value) {
        arr.push({ ID: newID, info: value });
        console.log(arr);
    }

    removeFromArray(arr, value) {
        const index = this.findIndex(value, arr);
        arr.splice(index, 1);
        console.log(arr);
    }
}