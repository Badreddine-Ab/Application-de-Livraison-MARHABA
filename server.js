require('dotenv').config()
const apiError = require('./Utils/apiError')
const globalError = require('./Middlewares/errorMiddleware')
const cors = require('cors');
const router = require('./Routes/authRouter')
const routerManager = require('./Routes/ManagerRouter')
const routerDelivryMen = require('./Routes/DelivryMenRouter')
const routerClient = require('./Routes/ClientRouter')


const express = require('express');
// const apiError = require('./Utils/apiError');
const app = express()

app.use(cors());
app.use(express.json())
app.use('/api/auth',router)
app.use('/api/manager',routerManager)
app.use('/api/livreure',routerDelivryMen)
app.use('/api/client',routerClient)

app.all('*',(req,res,next) => {
    next(new apiError(`Can't find this route: ${req.originalUrl}`,400))
})

// Global error handling middleware
app.use(globalError);

const port = process.env.PORT || 8081
app.listen(port, (err)=> {
    if(!err){
    console.log(`the port ${port} is running`)
    }else{
        console.log(err)
    }
})
