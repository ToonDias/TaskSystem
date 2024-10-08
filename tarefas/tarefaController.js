const express = require("express");
const router = express.Router();

const Tarefa = require("./Tarefa");
const Lista = require("../listas/Lista");

const {isAdmin} = require("../middlewares/userAuth");

// Create
router.get("/admin/lista/:id/tarefas/create", isAdmin, (req, res) => {
    var id = req.params.id;
    Lista.findByPk(id).then( lista => {
        res.render("admin/tarefas/create", {lista});
    });
});

router.post("/admin/tarefas/save", isAdmin, (req, res) => {
    var {titulo, descricao, listaId} = req.body;
    Tarefa.create({titulo, descricao, listaId}).then( () => {
        res.redirect("/admin/lista/" + listaId + "/tarefas");
    });
});
// Create

// Listar
router.get("/admin/lista/:id/tarefas", isAdmin, (req, res) => {
    var listaId = req.params.id;
    Tarefa.findAll({where: {listaId}}).then( tarefas => {
        Lista.findByPk(listaId).then( lista => {
           res.render("admin/tarefas/list",{tarefas, lista}); 
        });
    });
});
// Listar

// update
router.get("/admin/tarefas/editar/:id", isAdmin, (req, res) => {
    var id = req.params.id;
    Tarefa.findByPk(id).then( tarefa => {
            res.render("admin/tarefas/update", {tarefa});
        });
});

router.post("/admin/tarefa/updade", isAdmin, (req, res) => {
    var {id, titulo, descricao, listaId} = req.body;
    Tarefa.update({titulo, descricao, listaId}, {where: {id}}).then( () => {
        res.redirect("/admin/lista/" + listaId + "/tarefas");
    });
});
// update

// delete
router.post("/admin/tarefas/delete", isAdmin, (req, res) => {
    var id = req.body.id;
    Tarefa.destroy({where: {id}}).then( () => {
        res.redirect("/admin/tarefas")
    });
});
// delete

module.exports = router;