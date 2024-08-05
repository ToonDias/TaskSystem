const Sequelize = require("sequelize");
const Connection = require("../database/database");
const Empresa =  require("../empresas/Empresa");

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

Funcionario.belongsTo(Empresa);

//Funcionario.sync({force: true});

module.exports = Funcionario;