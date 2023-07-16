const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conexao = require("./dataBase/database");

//DataBase

conexao
.authenticate()
.then(() => {
    console.log("conexão feita com o banco de dados!");
})
.catch((msgErro) => {
    console.log(msgErro);
});

//Dizendo para o Express usar o EJS como View egine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get("/", (requisicao, resposta) => {
    resposta.render("index");
});

app.get("/pergunta", (request, respost) => {
    respost.render("perguntas");
});

app.post("/salvarPergunta", (requisicao, resposta) => {
    var titulo = requisicao.body.titulo;
    var descricao = requisicao.body.descricao;

    resposta.send(`Formulario recebido! <br> Título: ${titulo} <br> Descricao: ${descricao}`);
})

app.listen(4000, () => { console.log("App rodando!"); });