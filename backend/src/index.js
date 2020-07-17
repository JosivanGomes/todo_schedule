const express = require('express') //IMPORTAR EXPRESS
const server = express() //ESTANCIAR SERVIDOR 
server.use(express.json())//USAR JSON - PASSO 4 -

const taskRoutes = require('./routes/taskRoutes') //IMPORTAR A ROTA TASKROUTES - PASSO 4 -


server.use('/task', taskRoutes)//USAR ROTA NO SERVIDOR - PASSO 4 -


server.listen(3000, ()=>{           //INFORMAR O SERVIDOR PARA "OUVIR A PORTA 30000"
    console.log('Olá mundo!')
})