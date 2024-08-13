const express = require("express");
const router = express.Router();

const Lista = require("./Lista");
const Funcionario = require("../funcionarios/Funcionario");
const Tarefa = require("../tarefas/Tarefa");

const {isAdmin} = require("../middlewares/userAuth");

// Create
router.get("/admin/listas/create", isAdmin, (req ,res) => {
    Funcionario.findAll().then( funcionarios => {
        res.render("admin/listas/create", {funcionarios});
    });
});

router.post("/admin/listas/save", isAdmin, (req, res) => {
    var {titulo, status, funcionarioId} = req.body;
    Lista.create({titulo, status, funcionarioId}).then(() =>{
        res.redirect("/admin/listas");
    });
});
// Create

// Listar
router.get("/admin/listas", isAdmin, (req, res) =>{
    Lista.findAll({include: [{model: Funcionario}]}).then( listas =>{
        res.render("admin/listas/list",{listas});
    });    
});

router.get("/admin/funcionario/:id/listas", isAdmin, (req, res) => {
    var funcionarioId = req.params.id;
    Lista.findAll({include: [{model: Funcionario}]},{where: {funcionarioId}}).then( listas => {
        res.render("admin/listas/list",{listas});
    });
});
// Listar

// Update
router.get("/admin/listas/editar/:id", isAdmin, (req, res) => {
    var id = req.params.id;
    Funcionario.findAll().then( funcionarios => {
        Lista.findByPk(id).then( lista => {
            res.render("admin/listas/update", {lista, funcionarios});
         });
    });
});

router.post("/admin/listas/updade", isAdmin, (req, res) => {
    var {id, titulo, status, funcionarioId} = req.body;
    Lista.update({titulo, status, funcionarioId}, {where: {id}}).then(() => {
        res.redirect("/admin/listas");
    });
});
// Update

// Delete
router.post("/admin/listas/delete", isAdmin, (req, res) => {
    var id = req.body.id;
    Tarefa.findOne({where: {listaId: id}}).then( tarefa => {
        if(tarefa == undefined){
            Lista.destroy({where: {id}}).then(() => {
                res.redirect("/admin/listas");
            });
        }else{
            res.redirect("/admin/listas");
        }
    });
});
// Delete

module.exports = router;