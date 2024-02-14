const express = require('express');
//express
const router = express.Router();
//objeto de rotas do express
const Job = require('../models/Job')
//módulo Job

router.get('/test', (req, res) => {
    res.send('deu certo')
});
//rota de teste

/* DETALHE DA VAGA, view de job */
router.get('/view/:id', (req, res) => Job.findOne ({
    where: {id: req.params.id}
}).then(job => {
    res.render('view', {
        job
    });
  }).catch(err => console.log(err)));//se der algum erro


/* FORM DA ROTA DE ENVIO */

router.get('/add', (req, res) => {
//rota que vai fazer a busca do formulário
    res.render('add');
});



/* ADD JOB VIA POST */

router.post('/add', (req, res) => { 
//rota que adiciona os jobs ao projeto, vai ser um post
    let {title, salary, company, description, email, new_job} = req.body;
    
    Job.create({
    /* Inserir dados no sistema*/
        title, 
        description,
        salary,
        company,
        email,
        new_job,
    })
    .then(() => res.redirect('/'))//promessa retornada, se der certo me redireciona pra home
    .catch(err => console.log(err));//se der algum erro
});

module.exports = router
//tem sempre que lembrar de exportar quando estiver utilizando algo fora