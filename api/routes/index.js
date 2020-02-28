var express = require('express');
var router = express.Router();
const request = require('request-promise')
const paymentsModel = require('../models/payments')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getAccessToken', async(req,res)=>{
    console.log("query",req.query)
    console.log("url", req.originalUrl)
})

router.get('/test', async(req,res)=>{

    let access_token = "Njc5NTM1Mjk5NzEzNTY0Njcy.Xllz4A.swHYfv_fLY1X51-qPuhlQG_28rU"
    let guild = await request.get("https://discordapp.com/api/v6/guilds/683047056872439855", {
        headers:{ 
            'Authorization': 'Bot ' + access_token,
            "User-Agent": `DiscordBot (http://localhost:3000,6)`
        }
    })
    guild = JSON.parse(guild)
    let guildOwnerId = guild.owner_id
    let user = await request.get(`https://discordapp.com/api/v6/users/${guildOwnerId}`, {
        headers:{ 
            'Authorization': 'Bot ' + access_token,
            "User-Agent": `DiscordBot (http://localhost:3000,6)`
        }
    })

    res.send({user})
})

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

router.post('/withdraw', async(req,res)=>{
    try{
        await paymentsModel.updateOne({email: req.body.receiverEmail}/* {$and:[{email: req.body.receiverEmail}, {'payments.senderAddress': req.body.senderAddress}]} */,
            {
                $pull:{
                    'payments':{
                        senderAddress:  req.body.senderAddress
                    }
                }
            }).exec()

            res.status(200).send({
                error: 'nil',
                status: 'success',
                data: ''
            })

    }catch(err){
        console.log(err.message)
        res.status(500).send({
            error: err.message,
            status: 'fail',
            data: ""
        })
    }
})

router.post('/getPendingAmount', async(req,res)=>{
    let pending
    try{
        let query = await paymentsModel.findOne({$and:[{email: req.body.receiverEmail},
            {'payments.senderAddress': req.body.senderAddress}]}).lean().exec()

        if(query != null){
            console.log(query)
            let pendingAmounts = query.payments
            pending = pendingAmounts.filter((_amountObject)=>{
                    return _amountObject.senderAddress == req.body.senderAddress
            })
        }
        

        res.status(200).send({
            error: 'nil',
            status: 'success',
            pendingAmount: Number(pending[0].amount)
        })
    }catch(err){
        console.log(err.message)
        res.status(500).send({
            error: 'err.message',
            status: 'fail',
            pendingAmount: ''
        })
    }
})

router.post('/add', async(req,res)=>{
    let {receiverEmail, signature, message, amount, senderAddress} = req.body

    try{

        let data = await paymentsModel.find({$and:[{email: receiverEmail},
            {'payments.senderAddress': senderAddress}]}).lean().exec()

        if(data.length > 0){
            //user has already opened a channel with receiverEmail.
            await paymentsModel.updateOne({
                $and:[
                    {email: receiverEmail},
                    {'payments.senderAddress': senderAddress}
                ]
            },
            {
                email: receiverEmail,
                $set:{
                    'payments.$.signature': signature,
                    'payments.$.message' : message,
                    'payments.$.amount': amount,
                    'payments.$.senderAddress': senderAddress
                }
            }).exec()
        }else{
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
        }

        
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
