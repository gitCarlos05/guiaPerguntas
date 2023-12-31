const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conexao = require("./dataBase/database");
const Pergunta = require("./dataBase/Pergunta");
const Resposta = require("./dataBase/Resposta");

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
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC'] //DESC = decrescente    ASC = crescente
        ]
    }).then(perguntas => {

        resposta.render("index", {
            perguntas: perguntas
        });
    });

});

app.get("/pergunta", (request, resposta) => {
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
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;

    Pergunta.findOne({
        where: { id: id },
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC'] //DESC = decrescente    ASC = crescente
                ]
            }).then(resposta => {
                res.render("resposta", {
                    pergunta: pergunta,
                    resposta: resposta
                });
            }); 
        } else {
            res.redirect("/");
        }
    })
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

app.get('/deletarResposta/:id', function(req, res){
    var idResposta = req.params.id
    Resposta.destroy({ where: { "id": idResposta } })
        .then(() => {
            res.redirect('/')
        })
})

app.listen(4000, () => { console.log("App rodando!"); });