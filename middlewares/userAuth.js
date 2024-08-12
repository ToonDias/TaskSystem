function isAdmin(req, res, next){
    if(req.session.user != undefined){
        if(req.session.user.tipo == "admin"){
            next();
        }else{
            res.send("Essa rota não é compatível com o seu tipo de usuario");
        }
    }else{
        res.redirect("/login");
    }
}

function isNormalUser(req, res, next) {
    if(req.session.user != undefined){
        if(req.session.user.tipo == "normal"){
            next();
        }else{
            res.send("Essa rota não é compatível com o seu tipo de usuário");
        }
    }else{
        res.redirect("/login");
    }
}



module.exports = {isAdmin, isNormalUser};