export class dataFlow {

    findIndex(value, arr) {
        const index = arr.findIndex(item => (item.ID == value));
        return index;
    }

    pushToArray(arr, newID, value) {
        arr.push({ ID: newID, info: value });
    }

    removeFromArray(arr, value) {
        const index = this.findIndex(value, arr);

        if (index !== -1) {
            const removed = arr.splice(index, 1);
        }
    }
}

