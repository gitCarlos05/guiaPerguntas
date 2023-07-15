const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (requisicao, resposta) => {
    resposta.render("index");
});

app.get("/pergunta", (request, respost) => {
respost.render("perguntas");
})

app.listen(4000, () => { console.log("App rodando!"); })