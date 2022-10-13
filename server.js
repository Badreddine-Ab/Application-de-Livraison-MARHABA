require('dotenv').config()
const router = require('./Routes/authRouter')
const routerManager = require('./Routes/ManagerRouter')
const routerDelivryMen = require('./Routes/DelivryMenRouter')
const routerClient = require('./Routes/ClientRouter')


const express = require('express')
const app = express()

app.use(express.json())

app.use('/api/auth',router)
app.use('/api/manager',routerManager)
app.use('/api/livreure',routerDelivryMen)
app.use('/api/client',routerClient)



const port = process.env.PORT || 8081
app.listen(port, (err)=> {
    if(!err){
    console.log(`the port ${port} is running`)
    }else{
        console.log(err)
    }
})
