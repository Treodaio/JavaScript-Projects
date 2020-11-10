export class dataFlow {

    findIndex(value, where) {
        const index = where.findIndex(item => (item.ID == value));
        return index;
    }

    pushToArray(arr, newID, value) {
        arr.push({ ID: newID, info: value });
        console.log(arr);
    }

    // to add - removeItem
}