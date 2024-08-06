const express = require("express");
const router = express.Router();

const User = require("./User");
const Funcionario = require("../funcionarios/Funcionario");

// Create
router.get("/admin/users/create", (req, res) => {
    Funcionario.findAll().then( funcionarios => {
        res.render("admin/users/create", {funcionarios});
    });
});

router.post("/admin/users/save", (req, res) => {
    var {login, senha, funcionarioId} = req.body;
    User.create({login, senha, funcionarioId}).then(() => {
        res.redirect("/admin/users");
    });
});
// Create

// List
router.get("/admin/users", (req, res) => {
    User.findAll().then( users => {
        res.render("admin/users/list", {users});
    });
});
// List

// Update
router.get("/admin/users/edit/:id", (req, res) => {
    var id = req.params.id;
    User.findByPk(id).then( user => {
        Funcionario.findAll().then( funcionarios => {
            res.render("admin/users/create", {user, funcionarios});
        });
    });
});

router.post("/admin/users/edit/update", (req, res) => {
    var {id, login, senha, funcionarioId} = req.body;
    User.update({login, senha, funcionarioId}, {where: {id}}).then(() => {
        res.redirect("/admin/list");
    });
});
// Update

// Delete
router.post("/admin/users/delete", (req, res) => {
    var id = req.body.id;
    User.destroy({where: {id}}).then(() => {
        res.redirect("/admin/users");
    });
});
// Delete

module.exports = router;