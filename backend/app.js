const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const postRoutes = require('./routes/posts-routes')
const userRoutes = require('./routes/users-routes')

const HttpError = require('./models/http-error')
const app = express()

app.use(bodyParser.json())
app.use('/api/posts',postRoutes)
app.use('/api/users', userRoutes)


app.use((req, res, next) => {
    const error = new HttpError('Not Found', 404)
    throw error
})

app.use((error, req, res, next) => {
    if(res.headerSet) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({ message : error.message || 'Error' })
})


mongoose
    .connect('mongodb://127.0.0.1:27017/posts', { useNewUrlParser: true , useUnifiedTopology: true})
    .then( () => {
        app.listen(5000)
        console.log('connected!')
    })
    .catch( err => {
        console.log('connection failed!')
        console.log(err)
    })