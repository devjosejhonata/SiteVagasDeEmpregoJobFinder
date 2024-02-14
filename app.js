const express = require('express');
//chamando o express
const exphbs = require('express-handlebars');
//importando o handlebars, o handlebars é uma extensão do express
const app = express();
//invocando o express pra criar o servidor
const path = require('path');
//o path vai entender qual o diretório base da aplicação
const PORT = 3000;
//servidor na porta 3000
const db = require('./db/connection');
//buscanto o arquivo connection pra fazer a autenticação com o banco de dados
const bodyParser = require('body-parser');
const Job = require('./models/Job')
//inportando o modulo Jobs
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.listen(PORT, function() {
//escutar a porta e função que diz onde o express ta rodando //porta 3000
    console.log(`O express está rodando na porta ${PORT}`);
});


/* BODY PARSER */

app.use(bodyParser.urlencoded({ extended: false }));

/* HANDLE BARS */

app.set('views', path.join(__dirname, 'views'));//qual o diretório das views, onde vai ficar o template do projeto

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));//arquivo principal de layout, o main

app.set('view engine', 'handlebars');//informando qual o frameword ou biblioteca que vou utilizar pra renderizar as views

/* STATIC FOLDER */

app.use(express.static(path.join(__dirname, 'public')))//qual a pasta de arquivos staticos

/* DB CONNECTION */

db
   .authenticate()//Metodo authenticate, coneção com o banco //Conexao com o banco que vai fazer o teste sempre que a aplicação for iniciada ou tiver uma transaçao no banco
   .then(() => {//Promisse retornada, Sucesso da coneção com o banco
    console.log("Conectou ao banco com sucesso");
   }).catch(err => {//Erro na conexão com o banco
    console.log("Ocorreu um erro ao conectar", err);
   });

/* ROUTES */

app.get('/', (req, res) => {//rota barra, parametro requisição e resposta

    let search = req.query.job;//requisição vindo do query

    let query = '%'+search+'%';
    //combinar as porcentagens que combinam na sintax do like 
    //ex digitar press traz resultados wordpress, digitar ph traz php, digito algo e me traz algo relacionado*/
    
    if(!search) {//senao tiver busca, execute a logica da home
        Job.findAll({order: [//o metodo findAll vai encontrar todas as Jobs que eu tenho salva no banco
                ['createdAt', 'DESC']
            ]})
            .then(jobs => {//promisse retornada
                res.render('index', {                
                   jobs
                   //resposta, renderizando a index
                   //jobs dentro da index
                });
        }).catch(err => console.log(err));//seder algum problema vamos saber o que deu de errado 
    } else {
            Job.findAll({//o metodo findAll vai encontrar todas as Jobs que eu tenho salva no banco
            where: {title: {[Op.like]: query}}, 
            order: [
                ['createdAt', 'DESC']
            ]})
            .then(jobs => {//promisse retornada
                   res.render('index', {
                   jobs, search
                   //resposta, renderizando a index
                   //jobs dentro da index
                   //enviando a search para o front
            });
        }).catch(err => console.log(err));//seder algum problema vamos saber o que deu de errado 
    }
});

/* JOBS ROUTES, ROTAS DO JOBS*/

app.use('/jobs', require('./routes/jobs'));