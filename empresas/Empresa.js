const Sequelize = require("sequelize");
const Connection = require("../database/database");

const Empresa = Connection.define('empresas', {
    razao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fantasia: {
        type: Sequelize.STRING,
        allowNull: false
    },
    CNPJ: {
        type: Sequelize.STRING,
        allowNull: false
    },
    responsavel: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Empresa.sync({force: true});

module.exports = Empresa;