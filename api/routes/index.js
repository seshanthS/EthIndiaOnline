var express = require('express');
var router = express.Router();
const paymentsModel = require('../models/payments')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getPayments', async(req,res)=>{
    let email = req.body.email
    try{

        let payments = await paymentsModel.findOne({email: email}).lean().exec()
        res.status(200).send({
            error: 'nil',
            status: 'success',
            data: payments
        })

    }catch(err){
        console.log(err)
        res.status(500).send({
            error: err.message,
            status: 'fail',
            data: ""
        })
    }

})

router.post('/add', async(req,res)=>{
    let {receiverEmail, signature, message, amount, senderAddress} = req.body

    try{
        await paymentsModel.updateOne({
            email: receiverEmail
        }, {
            email: receiverEmail,
            $push:{
                payments: [{
                    signature: signature,
                    message: message,
                    amount: amount,
                    senderAddress, senderAddress
                }]
            }
            
        }, {upsert: true}).exec()

        res.status(200).send({   
            error: 'nil',
            status: 'success',
            data: ''
        })
    }catch(err){
        res.status(500).send({   
            error: err.message,
            status: 'success',
            data: ''
        })
    }

})

module.exports = router;
