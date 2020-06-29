// Initialize Sequelize
const Sequelize = require('sequelize');

// Config database connection
const connection = new Sequelize('converter', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb', // SQL, Oracle, etc...
    timezone: "-03:00",
});

module.exports = connection;