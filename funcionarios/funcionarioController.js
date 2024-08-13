const express = require("express");
const router = express.Router();

const Funcionario = require("./Funcionario");
const Empresa = require("../empresas/Empresa");
const Lista = require("../listas/Lista");
const User = require("../usuarios/User")

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
    User.fidnOne({where: {funcionarioId: id}}).then( user => {
        Lista.findOne({where: {funcionarioId: id}}).then( lista => {
            if(lista == undefined && user == undefined){
                Funcionario.destroy({where: {id}}).then(() => {
                    res.redirect("/admin/funcionarios");
                });
            }else{
                res.redirect("/admin/listas");
            }
        });
    });
});
// delete

module.exports = router;

