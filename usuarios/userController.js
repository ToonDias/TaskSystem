const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("./User");
const Funcionario = require("../funcionarios/Funcionario");

const adminAuth = require("../middlewares/userAuth");

// Create
router.get("/admin/usuarios/create", adminAuth, (req, res) => {
    Funcionario.findAll().then( funcionarios => {
        res.render("admin/usuarios/create", {funcionarios});
    });
});

router.post("/admin/usuarios/save", adminAuth, (req, res) => {
    var {login, senhaform, tipo, funcionarioId} = req.body;
    User.findOne({where: {login}}).then( user => {
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var senha = bcrypt.hashSync(senhaform, salt);
            User.create({login, senha, tipo, funcionarioId}).then( () => {
                res.redirect("/admin/usuarios");
            });
        }else{
            res.redirect("/admin/usuarios/create");
        }
    });
});
// Create

// List
router.get("/admin/usuarios", adminAuth, (req, res) => {
    User.findAll({include:[{model: Funcionario}]}).then( users => {
        res.render("admin/usuarios/list", {users});
    });
});
// List

// Update
router.get("/admin/usuarios/editar/:id", adminAuth, (req, res) => {
    var id = req.params.id;
    Funcionario.findAll().then( funcionarios => {
        User.findByPk(id).then( user => {        
                res.render("admin/usuarios/update", {user, funcionarios});
            });
    });
});

router.post("/admin/usuarios/update", adminAuth, (req, res) => {
    var {id, login, senhaform, tipo, funcionarioId} = req.body;
    var senha = senhaform;
    User.update({login, senha, tipo, funcionarioId}, {where: {id}}).then(() => {
        res.redirect("/admin/usuarios");
    });
});
// Update

// Delete
router.post("/admin/usuarios/delete", adminAuth, (req, res) => {
    var id = req.body.id;
    User.destroy({where: {id}}).then(() => {
        res.redirect("/admin/usuarios");
    });
});
// Delete

// Logar
router.get("/login", (req, res) => {
    res.render("admin/usuarios/login");
});

router.post("/autenticar", (req, res) => {
    var {login, senhaform} = req.body;

    User.findOne({where: {login}}).then( user => {
        if(user != undefined){
            var logar = bcrypt.compareSync(senhaform, user.senha);
            if(logar){
                req.session.user = {
                    login: user.login,
                    tipo: user.tipo,
                    funcionario: user.funcionarioId
                }
                res.redirect("/admin")
            }else{
                res.redirect("/login");
            }
        }else{
            res.redirect("/login");
        }
    });
});

router.get("/logout", (req , res) => {
    req.session.user = undefined;
    res.redirect("/login")
});
// Logar

module.exports = router;