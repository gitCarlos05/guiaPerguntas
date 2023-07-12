const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.get("/", (requisicao, resposta) => {
    resposta.render("../views/index", {
        name: "Parâmetro nome aqui",
        language: "Parâmetro language aqui",
        empresa: "Udemy",
        idade: "17 anos"
    })
});

app.get("/:nome/:language", (requisicao, resposta) => {
    var nome = requisicao.params.nome;
    var favoriteLanguage = requisicao.params.language;
    var exibirMensagem = true;
    resposta.render("../views/index", {
        name: nome,
        language: favoriteLanguage,
        empresa: "Udemy",
        idade: "17 anos",
        mensagem: exibirMensagem
    });
});





app.listen(4000, () => { console.log("App rodando!"); })