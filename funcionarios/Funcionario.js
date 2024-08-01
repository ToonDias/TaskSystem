const Sequelize = require("sequelize");
const Connection = require("../database/database");

Funcionario = Connection.define('funcionarios', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sexo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cargo: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

//Funcionario.sync({force: true});

module.exports = Funcionario;