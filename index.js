const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conexao = require("./dataBase/database");
const Pergunta = require("./dataBase/Pergunta");

//DataBase

conexao
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
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
    Pergunta.findAll({ raw: true }).then(perguntas => {
        console.log(perguntas);
        resposta.render("index",{
            perguntas: perguntas
        });
    });
    
});

app.get("/perguntas", (request, resposta) => {
    resposta.render("perguntas");
});

app.post("/salvarPergunta", (requisicao, resposta) => {
    var titulo = requisicao.body.titulo;
    var descricao = requisicao.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        resposta.redirect("/");
    });
    // resposta.send(`Formulario recebido! <br> Título: ${titulo} <br> Descricao: ${descricao}`);
});

app.listen(4000, () => { console.log("App rodando!"); });