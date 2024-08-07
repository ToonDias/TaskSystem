const Sequelize = require("sequelize");
const Connection = require("../database/database");

const Funcionario = require("../funcionarios/Funcionario");

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


User.belongsTo(Funcionario);

//User.sync({force: true});

module.exports = User;