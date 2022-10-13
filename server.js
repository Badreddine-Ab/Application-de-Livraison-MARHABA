require('dotenv').config()
const router = require('./Routes/authRoute')


const express = require('express')
const app = express()

app.use(express.json())

app.use('/api/auth',router)



const port = process.env.PORT || 8081
app.listen(port, (err)=> {
    if(!err){
    console.log(`the port ${port} is running`)
    }else{
        console.log(err)
    }
})
