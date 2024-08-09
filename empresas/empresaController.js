const express = require("express");
const router = express.Router();

const Empresa = require("./Empresa");

const adminAuth = require("../middlewares/adminAuth");


//Create
router.get("/admin/empresas/create", adminAuth, (req, res) => {
    res.render("admin/empresas/create");
});

router.post("/admin/empresas/save", adminAuth, (req, res) => {
    var {razao, fantasia, cnpj, responsavel} = req.body;
    Empresa.create({razao, fantasia, cnpj, responsavel}).then(() =>{
        res.redirect("/admin/empresas");
    });
});
//Create

//List
router.get("/admin/empresas", adminAuth, (req, res) => {
    Empresa.findAll().then( empresas =>{
        res.render("admin/empresas/list", {empresas});
    });
});
//List

//Edit
router.get("/admin/empresas/editar/:id", adminAuth, (req, res) => {
    var id = req.params.id;
    Empresa.findByPk(id).then( empresa => {
        res.render("admin/empresas/update",{empresa});
    });
});

router.post("/admin/empresas/update", adminAuth, (req, res) => {
    var {id, razao, fantasia, cnpj, responsavel} = req.body;
    Empresa.update({razao, fantasia, cnpj, responsavel},{where: {id}}).then(() => {
        res.redirect("/admin/empresas");
    });
});
//Edit

// Delete
router.post("/admin/empresas/delete", adminAuth, (req, res)=> {
    var id = req.body.id;
    Empresa.destroy({where: {id}}).then(() => {
        res.redirect("/admin/empresas");
    });
});
// Delete
module.exports = router;