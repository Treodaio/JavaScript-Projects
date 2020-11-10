export class dataFlow {

    findIndex(value, where) {
        const index = where.findIndex(item => (item.ID == value));
        return index;
    }

    pushToArray(arr, newID, newName) {
        arr.push({ ID: newID, note: newName });
        console.log(arr);

    }
}