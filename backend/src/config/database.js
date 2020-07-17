const mongoose = require('mongoose') //IMPORTAR MONGOOSE

const url = 'mongodb://localhost:27017/todoshedule' 
// INFORMAR LINK DE ACESSO AO DB mongodb://localhost:27017/todoshedule
//                                 DB           LOCAL        NOME DO BANCO QUE ESCOLHI

mongoose.connect(url, {useNewUrlParser: true})
// CONECTAR BANCO E FAZER ELE SER ACESSADO DE OUTRAS VERSÕES DO MONGODB

module.exports = mongoose //EXPORTAR CONECXÃO QUE FOI CRIADA