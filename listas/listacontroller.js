const express = require("express");
const router = express.Router();

const Lista = require("./Lista");

// Create
router.get("/admin/listas/create",(req ,res) => {
    res.render("admin/listas/create");
});

router.post("/admin/listas/save", (req, res) => {
    var titulo = req.body.titulo;
    var responsavel = req.body.responsavel;
    var status = req.body.status;

    Lista.create({titulo, responsavel, status}).then(() =>{
        res.redirect("/admin/listas");
    });
});
// Create

// Listar
router.get("/admin/listas", (req, res) =>{
    Lista.findAll().then( listas =>{
        res.render("admin/listas/list",{listas});
    });    
});
// Listar

// Update
router.get("/admin/listas/editar/:id", (req, res) => {
    var id = req.params.id;
    Lista.findByPk(id).then( lista => {
        res.render("admin/listas/update", {lista});
    });
});

router.post("/admin/listas/updade", (req, res) => {
    var id = req.body.id;
    var titulo = req.body.titulo;
    var responsavel = req.body.responsavel;
    var status = req.body.status;

    Lista.update({titulo, responsavel, status}, {where: {id}}).then(() => {
        res.redirect("/admin/listas");
    });
});
// Update
router.post("/admin/listas/delete", (req, res) => {
    var id = req.body.id;
    Lista.destroy({where: {id}}).then(() => {
        res.redirect("/admin/listas");
    });
});
//
module.exports = router;