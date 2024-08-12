// const express = require('express')
// const cors = require('cors')
// const env = require('dotenv')
// const mongoose = require('mongoose')
import express from 'express'
import cors from 'cors'
import env from 'dotenv'
import mongoose from 'mongoose'
const app = express()
// const routes = require('./test/userRoutes.js')
import UserRoute from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'

env.config()

app.use(cors()) //Enable cors
app.use(express.json()) //Parse incoming json request

//test call
app.get('/api',(req,res)=>res.send('hello'))

//userRoutes
app.use('/api/user', UserRoute);

//product router
app.use('/api/product',productRoutes)

//Routes

mongoose.connect(process.env.MONGODB_URI, {})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));