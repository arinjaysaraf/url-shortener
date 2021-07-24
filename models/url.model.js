const mongoose = require('mongoose');
const Schema = mongoose.Schema

const shorturlSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true
    }
})

const Shorturl = mongoose.model('shortUrl', shorturlSchema)

module.exports = Shorturl