const Sequelize     = require("sequelize");
const connection    = require("./database/database");

const PDF = connection.define("PDF", {
    file: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//PDF.sync({force: false});

module.exports = PDF;