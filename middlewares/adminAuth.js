function adminAuth(req, res, next){
    if(req.session.user != undefined){
        if(req.session.user.tipo == "admin"){
            next();
        }else{
            res.send("Você não tem acesso a essa rota!!");
        }
    }else{
        res.redirect("/login");
    }
}

module.exports = adminAuth;