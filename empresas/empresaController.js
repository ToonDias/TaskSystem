const express = require("express");
const router = express.Router();

const Empresa = require("./Empresa");

//Create
router.get("/admin/empresas/create", (req, res) => {
    res.render("admin/empresas/create");
});

router.post("/admin/empresas/save", (req, res) => {
    const razao = req.body.razao;
    const fantasia = req.body.fantasia;
    const cnpj = req.body.cnpj;
    const responsavel = req.body.responsavel;

    Empresa.create({razao, fantasia, cnpj, responsavel}).then(() =>{
        res.redirect("/admin/empresas");
    });
});
//Create

//List
router.get("/admin/empresas", (req, res) => {
    Empresa.findAll().then( empresas =>{
        res.render("admin/empresas/list", {empresas});
    });
});
//List

//Edit
router.get("/admin/empresas/editar/:id", (req, res) => {
    var id = req.params.id;
    Empresa.findByPk(id).then( empresa => {
        res.render("admin/empresas/update",{empresa});
    });
});

router.post("/admin/empresas/update", (req, res) => {
    var id = req.body.id;
    var razao = req.body.razao;
    var fantasia = req.body.fantasia;
    var cnpj = req.body.cnpj;
    var responsavel = req.body.responsavel;

    Empresa.update({razao,fantasia,cnpj,responsavel},{where: {id}}).then(() => {
        res.redirect("/admin/empresas");
    });
});
//Edit

// Delete
router.post("/admin/empresas/delete", (req, res)=> {
    var id = req.body.id;
    Empresa.destroy({where: {id}}).then(() => {
        res.redirect("/admin/empresas");
    });
});
// Delete
module.exports = router;