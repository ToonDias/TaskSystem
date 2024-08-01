const express = require("express");
const router = express.Router();

const Funcionario = require("./Funcionario");

// create
router.get("/admin/funcionarios/create", (req, res) => {
    res.render("admin/funcionarios/create");
});

router.post("/admin/funcionarios/save", (req, res) => {
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var sexo = req.body.sexo;
    var cargo = req.body.cargo;

    Funcionario.create({nome, cpf, sexo, cargo}).then( () => {
        res.redirect("/admin/funcionarios");
    });
});
// create

// list
router.get("/admin/funcionarios", (req, res) => {
    Funcionario.findAll().then( funcionarios => {
        res.render("admin/funcionarios/list", {funcionarios});
    });
});
// list

// update
router.get("/admin/funcionarios/editar/:id", (req, res) => {
    var id = req.params.id;

    Funcionario.findByPk(id).then( funcionario => {
        res.render("admin/funcionarios/update", {funcionario});
    });
});

router.post("/admin/funcionarios/update", (req, res) => {
    //parou aqui
});
// update

// delete
// delete

module.exports = router;

