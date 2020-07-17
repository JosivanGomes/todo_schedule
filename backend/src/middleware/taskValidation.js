const taskModel = require('../model/taskModel') //IMPORTAR O TASKMODEL

const {isPast} = require('date-fns') //INSTALAR E IMPORTAR O date-fns PARA TRABALHAR COM DATAS E HORAS
//A FUNÇÃO isPast VERIFICA SE DATA E HORA ESTÃO NO PASSADO

const taskValidation = async (req, res, next) => { //CRIAR A FUNÇÃO DE VALIDAÇÃO QUE VAI SER ASSINCRONA, VAI RECEBER A req, ENTREGAR A res E APONTAR PARA next CASOS ESTEJA TUDO CORRETO 
    
    const {macaddress, type, title, description, when} = req.body //DISTRIBUIR TUDO O QUE ESTÁ VINDO NO CORPO DA REQUISIÇÃO QUE É REQUERIDO

    if(!macaddress    ||
         !type        ||       //SE VAZIO
         !title       ||
         !description ||
         !when){
        return res.status(400).json('{ error: "Todos os campos obrigatórios devem ser preenchidos" }')
        //RETORNAR res COM O STATUS 400, COM O TEXTO DE ERRO NO FORMATO JSON 
    
            //FUNÇÃO DO DATE-FNS
    }else if(isPast(new Date(when))){
                    //CONVERTER O TEXTO DE when PARA O FORMATO DE DATA E HORA CORRETO
        return res.status(400).json('{ error: "Os campos Data e Hora não podem estar no passado" }')
        //RETORNAR res COM O STATUS 400, COM O TEXTO DE ERRO NO FORMATO JSON 
    }else{
        let exists //VERIFICA E O MESMO macaddress JÁ TEM UMA MESMA DATA E HORA CADASTRADA

                //ESPERA A REQUISIÇÃO ASSINCRONA SER RESOLVIDA

        if (req.params.id){
            exists = await taskModel
                            .findOne(
                                {
                                    '_id' : {'$ne' : req.params.id},
                                    'when' : {'$eq' : new Date(when)},
                                    'macaddress' : {'$in' : macaddress}
                                })    
        }else{
            exists = await taskModel
                            .findOne(
                                {   //PESQUISA NA CHAVE when
                                    'when' : {'$eq' : new Date(when)},
                                            //IGUAL A NOVA INCLUSÃO

                                    //PESQUISA NA CHAVE macaddress
                                    'macaddress' : {'$in' : macaddress}
                                                    //TENHA O MESMO macaddress
                            })
        }

        
                            
        if(exists){//SE EXISTIR RETORNA ERRO
            return res.status(400).json('{ error: "Já existe uma tarefa neste dia e horário" }')
        }else{//CASO NÃO PROSSEGUE
            next()
        }

        
    }
}

module.exports = taskValidation // EXPORTA A VALIDAÇÃO