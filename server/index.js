const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const controller = require('./Controller/controller')

mongoose.connect('mongodb+srv://user:user@cluster0.tej6f.mongodb.net/test')
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log(err))

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.use('/form-submit', controller)

app.listen(3009, () => console.log(`Server running on 3009`))
