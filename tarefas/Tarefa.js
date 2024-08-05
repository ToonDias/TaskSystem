const Sequelize = require("sequelize");
const Connection = require("../database/database");

const Lista = require("../listas/Lista");

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

Tarefa.belongsTo(Lista);

//Tarefa.sync({force: true});

module.exports = Tarefa;