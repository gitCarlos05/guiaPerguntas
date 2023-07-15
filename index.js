const express = require("express");
const app = express();
var exibirMensagem = true;
var produtos = [
    { nome: "Doritos", preco: 7.58 },
    { nome: "Pipoca", preco: 5.47 },
    { nome: "Passatempo", preco: 3.56 },
    { nome: "Fini mini", preco: 1.47 },
    { nome: "Coca-cola 2L", preco: 8.99 },
    { nome: "Energetico 2L", preco: 8.80 },
];

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get("/", (requisicao, resposta) => {
    resposta.render("../views/index", {
        name: "Parâmetro nome aqui",
        language: "Parâmetro language aqui",
        empresa: "Parâmetro empresa aqui",
        idade: "Parâmetro idade aqui",
        mensagem: exibirMensagem,
        produtos: produtos
    })
});

app.get("/:nome?/:language?/:empresa?/:idade?", (requisicao, resposta) => {
    var nome = requisicao.params.nome;
    var favoriteLanguage = requisicao.params.language;
    var empresa = requisicao.params.empresa;
    var idade = requisicao.params.idade;
    resposta.render("../views/index", {
        name: nome,
        language: favoriteLanguage,
        empresa: empresa,
        idade: idade,
        mensagem: exibirMensagem,
        produtos: produtos
    });
});





app.listen(4000, () => { console.log("App rodando!"); })