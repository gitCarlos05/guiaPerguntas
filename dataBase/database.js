const Sequelize = require('sequelize');

const conexao = new Sequelize('guia_perguntas', 'root', 'ccbviolino', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = conexao;