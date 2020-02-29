const mongoose = require('mongoose')

module.exports = new mongoose.model('config',{
    accessToken: String,
    refreshToken: String,
    expiresIn: String
})