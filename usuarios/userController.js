const express = require("express");
const router = express.Router();

const User = require("./User");
const Funcionario = require("../funcionarios/Funcionario");

// Create
router.get("/admin/usuarios/create", (req, res) => {
    Funcionario.findAll().then( funcionarios => {
        res.render("admin/usuarios/create", {funcionarios});
    });
});

router.post("/admin/usuarios/save", (req, res) => {
    var {login, senha, funcionarioId} = req.body;
    User.create({login, senha, funcionarioId}).then( () => {
        res.redirect("/admin/usuarios");
    });
});
// Create

// List
router.get("/admin/usuarios", (req, res) => {
    User.findAll({include:[{model: Funcionario}]}).then( users => {
        res.render("admin/usuarios/list", {users});
    });
});
// List

// Update
router.get("/admin/usuarios/editar/:id", (req, res) => {
    var id = req.params.id;
    Funcionario.findAll().then( funcionarios => {
        User.findByPk(id).then( user => {        
                res.render("admin/usuarios/update", {user, funcionarios});
            });
    });
});

router.post("/admin/usuarios/edit/update", (req, res) => {
    var {id, login, senha, funcionarioId} = req.body;
    User.update({login, senha, funcionarioId}, {where: {id}}).then(() => {
        res.redirect("/admin/usuarios");
    });
});
// Update

// Delete
router.post("/admin/usuarios/delete", (req, res) => {
    var id = req.body.id;
    User.destroy({where: {id}}).then(() => {
        res.redirect("/admin/usuarios");
    });
});
// Delete

module.exports = router;