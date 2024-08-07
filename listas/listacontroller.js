const express = require("express");
const router = express.Router();

const Lista = require("./Lista");
const Funcionario = require("../funcionarios/Funcionario");

// Create
router.get("/admin/listas/create",(req ,res) => {
    Funcionario.findAll().then( funcionarios => {
        res.render("admin/listas/create", {funcionarios});
    });
});

router.post("/admin/listas/save", (req, res) => {
    var {titulo, responsavel, status, funcionarioId} = req.body;
    Lista.create({titulo, responsavel, status, funcionarioId}).then(() =>{
        res.redirect("/admin/listas");
    });
});
// Create

// Listar
router.get("/admin/listas", (req, res) =>{
    Lista.findAll({include: [{model: Funcionario}]}).then( listas =>{
        res.render("admin/listas/list",{listas});
    });    
});

router.get("/admin/funcionario/:id/listas", (req, res) => {
    var funcionarioId = req.params.id;
    Lista.findAll({include: [{model: Funcionario}]},{where: {funcionarioId}}).then( listas => {
        res.render("admin/listas/list",{listas});
    });
});
// Listar

// Update
router.get("/admin/listas/editar/:id", (req, res) => {
    var id = req.params.id;
    Funcionario.findAll().then( funcionarios => {
        Lista.findByPk(id).then( lista => {
            res.render("admin/listas/update", {lista, funcionarios});
         });
    });
});

router.post("/admin/listas/updade", (req, res) => {
    var {id, titulo, responsavel, status, funcionarioId} = req.body;
    Lista.update({titulo, responsavel, status, funcionarioId}, {where: {id}}).then(() => {
        res.redirect("/admin/listas");
    });
});
// Update

// Delete
router.post("/admin/listas/delete", (req, res) => {
    var id = req.body.id;
    Lista.destroy({where: {id}}).then(() => {
        res.redirect("/admin/listas");
    });
});
// Delete

module.exports = router;