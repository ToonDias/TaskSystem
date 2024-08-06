const Sequelize = require("sequelize");
const Connection = require("../database/database");

const User = Connection.define("users", {
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync({force: true});

module.exports = User;