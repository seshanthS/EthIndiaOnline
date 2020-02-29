var mongoose = require('mongoose');

module.exports = new mongoose.model('payments', {
    email: String,
    payments: [{
        signature: String,
        message: String,
        amount: String,
        senderAddress: String
    }]
})