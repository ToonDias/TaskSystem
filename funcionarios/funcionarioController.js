const express = require("express");
const router = express.Router();

const Funcionario = require("./Funcionario");
const Empresa = require("../empresas/Empresa");

const {isAdmin} = require("../middlewares/userAuth");

// create
router.get("/admin/funcionarios/create", isAdmin, (req, res) => {
    Empresa.findAll(). then( empresas => {
        res.render("admin/funcionarios/create",{empresas});
    });
});

router.post("/admin/funcionarios/save", isAdmin, (req, res) => {
    var {nome, cpf, sexo, cargo, empresaId} = req.body;
    Funcionario.create({nome, cpf, sexo, cargo, empresaId}).then( () => {
        res.redirect("/admin/funcionarios");
    });
});
// create

// list
router.get("/admin/funcionarios", isAdmin, (req, res) => {
    Funcionario.findAll({ include: [{model: Empresa}]}).then( funcionarios => {
        res.render("admin/funcionarios/list", {funcionarios});
    });
});

router.get("/admin/empresa/:id/funcionarios", isAdmin, (req, res) => {
    var empresaId = req.params.id;
    Funcionario.findAll({ include: [{model: Empresa}]}, {where: {empresaId}}).then( funcionarios => {
        res.render("admin/funcionarios/list", {funcionarios});
    });
});
// list

// update
router.get("/admin/funcionarios/editar/:id", isAdmin, (req, res) => {
    var id = req.params.id;
    Empresa.findAll().then( empresas => {
        Funcionario.findByPk(id).then( funcionario => {
            res.render("admin/funcionarios/update", {funcionario, empresas});
        });
    });
});

router.post("/admin/funcionarios/update", isAdmin, (req, res) => {
    var {id, nome, cpf, sexo, cargo, empresaId} = req.body;
    Funcionario.update({nome, cpf, sexo, cargo, empresaId},{where: {id}}).then( () => {
        res.redirect("/admin/funcionarios");
    });
});
// update

// delete
router.post("/admin/funcionarios/delete", isAdmin, (req, res) => {
    var id = req.body.id;
    Funcionario.destroy({where: {id}}).then(() => {
        res.redirect("/admin/funcionarios");
    });
});
// delete

module.exports = router;

