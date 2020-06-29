class Table {
    constructor(arr) {
        this.header = arr[0]; // Separate the header
        arr.shift;
        this.rows   = arr; // Separate all rows
    }

    get RowCount() {
        return this.rows.length;
    }

    get ColumnCount() {
        return this.header.length;
    }
}

module.exports = Table;