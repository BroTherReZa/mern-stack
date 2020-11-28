const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const postRoutes = require('./routes/posts-routes')
const userRoutes = require('./routes/users-routes')

const HttpError = require('./models/http-error')
const app = express()

app.use(bodyParser.json())

app.use('/uploads/images',express.static(path.join('uploads','images')))

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    res.setHeader('Access-Control-Allow-Methods','*')
    next()
})
app.use('/api/posts',postRoutes)
app.use('/api/users', userRoutes)


app.use((req, res, next) => {
    const error = new HttpError('Not Found', 404)
    throw error
})

app.use((error, req, res, next) => {
    if(req.file){
        fs.unlink(req.file.path, (err)=>{
            console.log(err)
        })
    }
    if(res.headerSet) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({ message : error.message || 'Error' })
})


mongoose
    .connect('mongodb://127.0.0.1:27017/mern')  //, { useNewUrlParser: true , useUnifiedTopology: true})
    .then( () => {
        app.listen(5000)
        console.log('connected!')
    })
    .catch( err => {
        console.log('connection failed!')
        console.log(err)
    })