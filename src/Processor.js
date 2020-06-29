class Processor {
    static Process(data) {
        var split   = data.split("\r\n");
        var rows    = [];

        split.forEach(row => {
            var arr = row.split(";"); // You can separate by: "," etc
            rows.push(arr);
        });

        return rows;
    }
}

module.exports = Processor;