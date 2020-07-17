const taskModel = require('../model/taskModel') //IMPORTANDO O MODELO PARA A INCLUSÃO DE DADOS

const current = new Date()

const {startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear} = require('date-fns')

class TaskController{

    async create(req, res){  //ASYNC == FUNÇÃO ACINCRONA; FUNÇÃO PARA CRIAR NOVA TAREFA; REQ == REQUISIÇÃO; RES == RESPOSTA

        const task = new taskModel(req.body) //NOVA TASK SEGUINDO O MODELO PEGANDO INFORMAÇÃO DO CORPO DA PÁGINA 
        await task //AWAIT == ESPERE; TASK
                .save() // SALVAR
                .then(response => { //TUDO CERTO
                    return res.status(200).json(response)
                })
                .catch(error => { //DEU ERRO
                    return res.status(500).json(error)
                })

    }

    async update(req, res){
        await taskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(500).json(error)
        })
    }

    async all(req, res){                      //==
        await taskModel.find({'macaddress' : {'$eq' : req.params.macaddress}})
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async show(req,res){
        await taskModel.findById(req.params.id)
            .then(response => {
                if (response){
                    return res.status(200).json(response)
                }else{
                    return res.status(404).json({error : 'Tarefa não encontrada'})
                }
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async delete(req, res){
        await taskModel.deleteOne({'_id' : req.params.id})
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async done(req, res){
        await taskModel.findByIdAndUpdate({'_id' : req.params.id}, {'done' : req.params.done}, {new: true})
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async late(req, res){
        await taskModel.find({'when' : {'$lt' : current}, 'macaddress' : req.params.macaddress})
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async today(req, res){              //>=                            <
        await taskModel.find({'when' : {'$gte' : startOfDay(current), '$lte' : endOfDay(current)},
             'macaddress' : req.params.macaddress})
             .sort('when')
             .then(response => {
                 return res.status(200).json(response)
             })
             .catch(error => {
                 return res.status(500).json(error)
             })
    }

    async week(req, res){              //>=                            <
        await taskModel.find({'when' : {'$gte' : startOfWeek(current), '$lte' : endOfWeek(current)},
             'macaddress' : req.params.macaddress})
             .sort('when')
             .then(response => {
                 return res.status(200).json(response)
             })
             .catch(error => {
                 return res.status(500).json(error)
             })
    }

    async month(req, res){              //>=                            <
        await taskModel.find({'when' : {'$gte' : startOfMonth(current), '$lte' : endOfMonth(current)},
             'macaddress' : req.params.macaddress})
             .sort('when')
             .then(response => {
                 return res.status(200).json(response)
             })
             .catch(error => {
                 return res.status(500).json(error)
             })
    }

    async year(req, res){              //>=                            <
        await taskModel.find({'when' : {'$gte' : startOfYear(current), '$lte' : endOfYear(current)},
             'macaddress' : req.params.macaddress})
             .sort('when')
             .then(response => {
                 return res.status(200).json(response)
             })
             .catch(error => {
                 return res.status(500).json(error)
             })
    }

}

module.exports = new TaskController() //EXPORTAR O OBJETO TASKCONTROLLER