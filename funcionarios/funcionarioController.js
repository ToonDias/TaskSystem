const express = require("express");
const router = express.Router();

const Funcionario = require("./Funcionario");
const Empresa = require("../empresas/Empresa");

// create
router.get("/admin/funcionarios/create", (req, res) => {
    Empresa.findAll(). then( empresas => {
        res.render("admin/funcionarios/create",{empresas});
    });
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
    var id = req.body.id;
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var sexo = req.body.sexo;
    var cargo = req.body.cargo;

    Funcionario.update({nome, cpf, sexo, cargo},{where: {id}}).then( () => {
        res.redirect("/admin/funcionarios");
    });
});
// update

// delete
router.post("/admin/funcionarios/delete", (req, res) => {
    var id = req.body.id;
    Funcionario.destroy({where: {id}}).then(() => {
        res.redirect("/admin/funcionarios");
    });
});
// delete

module.exports = router;

