const express = require('express') //IMPORTAR EXPRESS
const router = express.Router() //USAR AS FUNÇÕES DE ROTA DO EXPRESS

const taskController = require('../controller/taskcontroller') //USAR O OBJETO DE TASKCONTROLLER
const taskValidation = require('../middleware/taskValidation') // PASSO - 5 -
const macaddressValidation = require('../middleware/macaddressValidation')

                // PASSO - 5 -
router.post('/', taskValidation, taskController.create) //USAR ROTA TIPO POST PELO ACESSO NA RAIZ; USAR A FUNÇÃO CREATE DE TASKCONTROLLER

router.put('/:id', taskValidation, taskController.update)

router.put('/:id/:done', taskController.done)

router.get('/:id', taskController.show)

router.get('/filter/all/:macaddress', taskController.all)

router.get('/filter/late/:macaddress', taskController.late)

router.get('/filter/today/:macaddress', taskController.today)

router.get('/filter/week/:macaddress', taskController.week)

router.get('/filter/month/:macaddress', taskController.month)

router.get('/filter/year/:macaddress', taskController.year)


router.delete('/:id', taskController.delete)



module.exports = router //EXPORTAR ROTA