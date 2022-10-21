const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')
const apiError = require('./errorMiddleware');
const { json } = require("express");

const app = express();

app.use(cookieParser());

const authorization = (req, res, next) => {
    
    const token = req.cookies.access_token;
   
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = data.id;
      req.userRole = data.role;
      return next();
    } catch(error) {
        console.log(error)
      return res.sendStatus(403);
    }
  };

const IsAdmin = (req,res,next) => {
    if(req.userRole != 'ADMIN'){
        res.status(404).send('You are not an admin')
    }
}
const IsClient = (req,res,next) => {
    if(req.userRole != 'CLIENT'){
        res.status(404).send('You are not an client')
    }else{
        next()
    }
}
const IsManager = (req,res,next) => {
    if(req.userRole != 'MANAGER'){
        res.status(404).send('You are not an manager')
    }
}
const IsDelivryMan = (req,res,next) => {
    console.log(req.userRole)
    if(req.userRole != 'LIVREURE'){
        res.status(404).send('You are not an delivrey man')
    }else {
        next()
    }
}

module.exports ={
    authorization,
    IsAdmin,
    IsClient,
    IsManager,
    IsDelivryMan
} 