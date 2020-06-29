const Sequelize     = require("sequelize");
const connection    = require("./database/database");

const HTML = connection.define("html", {
    file: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//HTML.sync({force: false});

module.exports = HTML;