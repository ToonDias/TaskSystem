const Sequelize = require("sequelize");
const Connection = require("../database/database");

const Lista = Connection.define('listas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    responsavel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Lista.sync({force: true});

module.exports = Lista;