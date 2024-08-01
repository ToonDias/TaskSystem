const express = require("express");
const bodyParser = require("body-parser");
const Connection = require("./database/database");

const Empresa = require("./empresas/Empresa");
const empresaController = require("./empresas/empresaController");

const app = express();

// configuração do template engine
app.set('views engine', 'ejs');

// configuração do body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// definição do diretorio estatico
app.use(express.static('public'));

//definição das urls
app.use("/", empresaController);

// conexão com o banco
Connection.authenticate()
    .then( () => {
        console.log("Conectado ao banco de dados!!");
    })
    .catch( (error) => {
        console.log("Conexão com o banco falhou! Erro: " + error);
    });

app.listen(8081, (error) => {
    if(error){
        console.log("Servidor não está rodando! Erro: " + error);
    }else{
        console.log("Servidor rodando! URL: http://localhost:8081");
    }
});