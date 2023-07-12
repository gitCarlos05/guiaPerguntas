const express = require("express");
const app = express();

app.set('view engine','ejs');

app.get("/", (requisicao, resposta) => {
    var nome = "Carlos Valdir";
    var favoriteLanguage = "JavaScript";
        resposta.render("../views/index",{
            nome: nome,
            language: favoriteLanguage,
            empresa: "Udemy",
            idade: "17 anos"
        });

    });





app.listen(4000,() => {console.log("App rodando!");})