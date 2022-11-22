const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    data: {
        required: true,
        type: Array
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Data', DataSchema) 