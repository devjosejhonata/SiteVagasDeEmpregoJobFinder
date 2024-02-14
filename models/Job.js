const Sequelize = require('sequelize');
const db = require('../db/connection');//chamando arquivo de conexão com o banco

const Job = db.define('job', {
    title: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.STRING,
    }, 
    company: {
        type: Sequelize.STRING,
    }, 
    email: {
        type: Sequelize.STRING,
    },
    new_job: {
        type: Sequelize.INTEGER,
    },
    description: {
        type: Sequelize.STRING,
    }
    //todas as propriedades que o objeto possui;
});
//criando o model com o metodo define do sequelize
//model criado com base nos campos da tabela

module.exports = Job
//exportando o módulo pra poder utilizar onde precisar