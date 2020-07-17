const mongoose = require('../config/database')  //IMPORTAR O MONGOOSE JÁ CONECTADO DA PASTA CONFIG

const Schema = mongoose.Schema //INSTANCIAR ESQUEMA DO MONGOOSE

const taskSchema = new Schema({ //CRIAR NOVO ESQUEMA
    macaddress: {type: String, required: true}, //ENDEREÇO DE QUEM CRIOU, PC OU CELULAR
    type: {type: Number, require: true},        //TIPO
    title: {type: String, require: true},       //TITULO
    description: {type: String, require: true}, //DESCRIÇÃO
    when: {type: Date, require: true},          //DATA E HORA VÃO JUNTOS
    done: {type: Boolean, default: false},      //CONCLUIDO VAI FALSO COMO PADRÃO
    created: {type: Date, default: Date.now()}  //DATA E HORA DA CRIAÇÃO
})

module.exports = mongoose.model('Task', taskSchema) //EXPORTANDO O MODELO PARA GUARDAR DADOS NO MONGODB QUE ACABA DE SER CRIADO

