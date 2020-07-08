const Sequelize     = require("sequelize");
const connection    = require("./database/database");

const CSV = connection.define("csv", {
    file: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

CSV.sync({force: false});

module.exports = CSV;
