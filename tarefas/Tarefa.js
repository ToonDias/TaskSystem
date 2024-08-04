const Sequelize = require("sequelize");
const Connection = require("../database/database");

const Tarefa = Connection.define("tarefas", {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Tarefa.sync({force: true});

module.exports = Tarefa;