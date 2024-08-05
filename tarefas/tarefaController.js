const express = require("express");
const router = express.Router();

const Tarefa = require("./Tarefa");
const Lista = require("../listas/Lista");

// Create
router.get("/admin/lista/:id/tarefas/create", (req, res) => {
    var id = req.params.id;
    Lista.findByPk(id).then( lista => {
        res.render("admin/tarefas/create", {lista});
    });
});

router.post("/admin/tarefas/save", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var listaId = req.body.lista;

    Tarefa.create({titulo, descricao, listaId}).then( () => {
        res.redirect("/admin/tarefas/lista/" + listaId);
    });
});
// Create

// Listar
router.get("/admin/tarefas/lista/:id", (req, res) => {
    var listaId = req.params.id;
    Tarefa.findAll({where: {listaId}}).then( tarefas => {
        Lista.findByPk(listaId).then( lista => {
           res.render("admin/tarefas/list",{tarefas, lista}); 
        });
    });
});
// Listar

// update
router.get("/admin/tarefas/editar/:id", (req, res) => {
    var id = req.params.id;
    Tarefa.findByPk(id).then( tarefa => {
        Lista.findAll().then( listas => {
            res.render("admin/tarefas/update", {tarefa, listas});
        });
    });
});

router.post("/admin/tarefa/updafe", (req, res) => {
    var id = req.body.id;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var listaId = req.body.lista;

    Tarefa.update({titulo, descricao, listaId}, {where: {id}}).then( () => {
        res.redirect("/admin/tarefas");
    });
});
// update

// delete
router.post("/admin/tarefas/delete", (req, res) => {
    var id = req.body.id;
    Tarefa.destroy({where: {id}}).then( () => {
        res.redirect("/admin/tarefas")
    });
});
// delete

module.exports = router;