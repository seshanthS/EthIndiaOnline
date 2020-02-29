var express = require('express');
var router = express.Router();
const request = require('request-promise')
const paymentsModel = require('../models/payments')
const configModel = require('../models/configModel')
const allowanceModel = require('../models/allowance')

let bot_accessToken
getToken()
async function getToken(){
    bot_access_token = await configModel.find({}).lean().exec()
    if(bot_accessToken != null)
    bot_accessToken = JSON.parse(bot_access_token).accessToken
}
/* GET home page. */
router.get('/', async function(req, res, next) {
    console.log("query",req.query)
    console.log("url", req.originalUrl)
    console.log(req.body)
    if(req.query.code != undefined){
        let response = await request.post('https://discordapp.com/api/oauth2/token', {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            formData:{
                client_id:'679535299713564672',
                client_secret:'L78LJNbRzjuMHcm1n0zRVD7d322t36A8',
                grant_type:'authorization_code',
                code: req.query.code,
                redirect_uri: 'http://ethindiaonline.ddns.net/',
                scope: 'identify email connections bot'
            },
    
        })
        console.log({response})
        response = JSON.parse(response)
        bot_access_token = response.access_token

        await configModel.updateOne({},{
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            expiresIn: new Date().getTime() + response.expires_in
        },{upsert: true}).exec()
        
        res.send({Authorized: true});
    }else{
        res.send({message:'received your msg da...'})
    }
  
});

router.get('/refreshTokens', async(req,res)=>{

    let tokens = await configModel.find({}).lean().exec()
    tokens = tokens[0]
    let response = await request.post('https://discordapp.com/api/oauth2/token', {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            formData:{
                client_id:'679535299713564672',
                client_secret:'L78LJNbRzjuMHcm1n0zRVD7d322t36A8',
                grant_type:'refresh_token',
                refresh_token: tokens.refreshToken,
                redirect_uri: 'http://ethindiaonline.ddns.net/',
                scope: 'identify email connections bot'
            },
    
        })

        console.log(JSON.parse(response))
        response = JSON.parse(response)
        await configModel.updateOne({},{
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            expiresIn: new Date().getTime() + response.expires_in
        },{upsert: true}).exec()

        res.send({message: "done"})
})

//todo check refresh token and update

router.post('/getAccessToken', async(req,res)=>{
    console.log("query",req.query)
    console.log("url", req.originalUrl)

    
 
})

router.get('/getEmailById/:id', async(req,res)=>{
    //let bot_access_token = "Njc5NTM1Mjk5NzEzNTY0Njcy.Xllz4A.swHYfv_fLY1X51-qPuhlQG_28rU"
    let config = await configModel.find({}).lean().exec()
    let user = await request.get(`https://discordapp.com/api/v6/users/${req.params.id}`, {
        headers:{ 
            'Authorization': 'Bearer '+ config.accessToken , //bot_access_token,
            "User-Agent": `DiscordBot (http://localhost:3000,6)`
        }
    })

    console.log({user})
    res.send({user})
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

router.post('/getAllowanceStatus', async(req,res)=>{
    let {senderAddress, receiverAddress} = req.body 
    let results = await allowanceModel.find({$and:[
        {senderAddress: senderAddress}, {receiverAddress: receiverAddress}
    ]}).exec()

    if(results.length > 0){
        res.send({allowance: true})
    }else{
        res.send({allowance: true})
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
        await allowanceModel.update({},{  
            senderAddress: senderAddress,
            receiverEmail: receiverEmail
        },{upsert: true})
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
