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
module.exports = router;