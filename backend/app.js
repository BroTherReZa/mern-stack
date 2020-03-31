const express = require('express')
const bodyParser = require('body-parser')
const postRoutes = require('./routes/posts-routes')
const app = express()

app.use(bodyParser.json())

app.use('/api/posts',postRoutes)
app.use((error, req, res, next) => {
    if(res.headerSet) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({ message : error.message || 'Error' })
})


app.listen(5000)