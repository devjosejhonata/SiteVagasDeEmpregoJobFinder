const Sequelize = require('sequelize');
//chamando o sequelize
//sequelize é uma aplicação pra usar bancos relacionais com o node.

const sequelize = new Sequelize({//pra fazer a conexão com o banco, tem que criar uma instancia
    dialect: 'sqlite',//qual banco
    storage: './db/app.db'//onde está o banco
});
//conexão com o banco

module.exports = sequelize
//exportando a conexao com o banco