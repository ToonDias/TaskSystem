const express = require("express");
const bodyParser = require("body-parser");
const Connection = require("./database/database");
const session =  require("express-session");

const Empresa = require("./empresas/Empresa");
const empresaController = require("./empresas/empresaController");
const Funcionario = require("./funcionarios/Funcionario");
const funcionarioController = require("./funcionarios/funcionarioController");
const Listas = require("./listas/Lista");
const listaController = require("./listas/listacontroller");
const Tarefa = require("./tarefas/Tarefa");
const tarefaController = require("./tarefas/tarefaController");
const User = require("./usuarios/User");
const userController = require("./usuarios/userController");

const app = express();

// configuração do template engine
app.set('view engine', 'ejs');

// configuração de sessions
app.use(session({
    secret: "qualquercoisaaleatoria",
    cookie: {maxAge: 30000}
}));

// configuração do body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// definição do diretorio estatico
app.use(express.static('public'));

// conexão com o banco
Connection.authenticate()
    .then( () => {
        console.log("Conectado ao banco de dados!!");
    })
    .catch( (error) => {
        console.log("Conexão com o banco falhou! Erro: " + error);
    });

// definição das urls
app.use("/", empresaController);
app.use("/", funcionarioController);
app.use("/", listaController);
app.use("/", tarefaController);
app.use("/", userController);

// Rota raiz
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/admin", (req, res) => {
    res.render("admin/index");
});

app.listen(8081, (error) => {
    if(error){
        console.log("Servidor não está rodando! Erro: " + error);
    }else{
        console.log("Servidor rodando! URL: http://localhost:8081");
    }
});