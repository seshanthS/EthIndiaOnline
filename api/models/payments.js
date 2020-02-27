var mongoose = require('mongoose');

module.exports = mongoose.model('wallet', {
    email: String,
    payments: [{
        signature: String,
        message: String,
        amount: String,
        senderAddress: String
    }]
})