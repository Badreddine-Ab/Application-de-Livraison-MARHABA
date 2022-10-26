require('dotenv').config()

const apiError = require('./Utils/apiError')
const globalError = require('./Middlewares/errorMiddleware')
const cors = require('cors');
const router = require('./Routes/authRouter')
const routerManager = require('./Routes/ManagerRouter')
const routerDelivryMen = require('./Routes/DelivryMenRouter')
const routerClient = require('./Routes/ClientRouter')
const cookieParser = require("cookie-parser");


const express = require('express');
// const apiError = require('./Utils/apiError');
const app = express()

app.use(cookieParser());
app.use(cors());
app.use(express.json())
const dbConnection = require("./Config/database")
app.use('/api/auth',router)
app.use('/api/manager',routerManager)
app.use('/api/livreure',routerDelivryMen)
app.use('/api/client',routerClient)


dbConnection();



app.all('*',(req,res,next) => {
    next(new apiError(`Can't find this route: ${req.originalUrl}`,400))
})

// Global error handling middleware
app.use(globalError);

const port = process.env.PORT || 8081
const server = app.listen(port, (err)=> {
    if(!err){
    console.log(`the port ${port} is running`)
    }else{
        console.log(err)
    }
})

// Handle errors outside express
process.on("unhandledRejection",(err)=> {
    console.error(`UnhandledRejection Errors : ${err.name} | ${err.message}`);
    server.close(()=> {
        console.error('Shutting down....')
        process.exit(1)
    })
    
})
