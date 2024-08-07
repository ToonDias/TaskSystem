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
    var {nome, cpf, sexo, cargo, empresaId} = req.body;
    Funcionario.create({nome, cpf, sexo, cargo, empresaId}).then( () => {
        res.redirect("/admin/funcionarios");
    });
});
// create

// list
router.get("/admin/funcionarios", (req, res) => {
    Funcionario.findAll({ include: [{model: Empresa}]}).then( funcionarios => {
        res.render("admin/funcionarios/list", {funcionarios});
    });
});

router.get("/admin/empresa/:id/funcionarios", (req, res) => {
    var empresaId = req.params.id;
    Funcionario.findAll({ include: [{model: Empresa}]}, {where: {empresaId}}).then( funcionarios => {
        res.render("admin/funcionarios/list", {funcionarios});
    });
});
// list

// update
router.get("/admin/funcionarios/editar/:id", (req, res) => {
    var id = req.params.id;
    Empresa.findAll().then( empresas => {
        Funcionario.findByPk(id).then( funcionario => {
            res.render("admin/funcionarios/update", {funcionario, empresas});
        });
    });
});

router.post("/admin/funcionarios/update", (req, res) => {
    var {id, nome, cpf, sexo, cargo, empresaId} = req.body;
    Funcionario.update({nome, cpf, sexo, cargo, empresaId},{where: {id}}).then( () => {
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

