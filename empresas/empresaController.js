const express = require("express");
const router = express.Router();

const Empresa = require("./Empresa");
const Funcionario = require("../funcionarios/Funcionario");

const {isAdmin} = require("../middlewares/userAuth");
const { where } = require("sequelize");


//Create
router.get("/admin/empresas/create", isAdmin, (req, res) => {
    res.render("admin/empresas/create");
});

router.post("/admin/empresas/save", isAdmin, (req, res) => {
    var {razao, fantasia, cnpj, responsavel} = req.body;
    Empresa.create({razao, fantasia, cnpj, responsavel}).then(() =>{
        res.redirect("/admin/empresas");
    });
});
//Create

//List
router.get("/admin/empresas", isAdmin, (req, res) => {
    Empresa.findAll().then( empresas =>{
        res.render("admin/empresas/list", {empresas});
    });
});
//List

//Edit
router.get("/admin/empresas/editar/:id", isAdmin, (req, res) => {
    var id = req.params.id;
    Empresa.findByPk(id).then( empresa => {
        res.render("admin/empresas/update",{empresa});
    });
});

router.post("/admin/empresas/update", isAdmin, (req, res) => {
    var {id, razao, fantasia, cnpj, responsavel} = req.body;
    Empresa.update({razao, fantasia, cnpj, responsavel},{where: {id}}).then(() => {
        res.redirect("/admin/empresas");
    });
});
//Edit

// Delete
router.post("/admin/empresas/delete", isAdmin, (req, res)=> {
    var id = req.body.id;
    Funcionario.findOne({where: {empresaId: id}}).then( funcionario => {
        if(funcionario == undefined){
            Empresa.destroy({where: {id}}).then(() => {
                res.redirect("/admin/empresas");
            });
        }else{
            res.redirect("/admin/empresas");
        }
    });
});
// Delete
module.exports = router;