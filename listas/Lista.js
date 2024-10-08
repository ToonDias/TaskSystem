const Sequelize = require("sequelize");
const Connection = require("../database/database");

const Funcionario = require("../funcionarios/Funcionario");

const Lista = Connection.define('listas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Lista.belongsTo(Funcionario);

//Lista.sync({force: true});

module.exports = Lista;