const express = require("express");
const router = express.Router();

const Tarefa = require("./Tarefa");

// Create
router.get("/admin/tarefas/create", (req, res) => {
    res.render("admin/tarefas/create");
});

router.post("/admin/tarefas/save", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Tarefa.create({titulo, descricao}).then( () => {
        res.redirect("/admin/tarefas");
    });
});
// Create

// Listar
router. get("/admin/tarefas", (req, res) => {
    Tarefa.findAll().then( tarefas => {
       res.render("admin/tarefas/list", {tarefas}); 
    });
});
// Listar

// update
router.get("/admin/tarefas/editar/:id", (req, res) => {
    var id = req.params.id;
    Tarefa.findByPk(id).then( tarefa => {
        res.render("admin/tarefas/update", {tarefa});
    });
});

router.post("/admin/tarefa/updafe", (req, res) => {
    var id = req.body.id;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Tarefa.update({titulo, descricao}, {where: {id}}).then( () => {
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