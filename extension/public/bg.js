window.addEventListener('load', async function() {
    console.log('All assets are loaded')
    setTimeout(async()=>{
        console.log('test')
        var torus = window.torus
        await torus.cleanUp()
        await torus.init({
            enabledVerifiers :{
                google: true,
                facebook: false,
                reddit: false,
                twitch: false,
                discord: false
            },
            showTorusButton: false,
            network: {
                host: "https://testnet2.matic.network"//"matic",
            }

        })
        await torus.login()
        const web3 = new Web3(window.ethereum);
        let userInfo = await torus.getUserInfo()
        console.log(await torus.getPublicAddress({
            verifier: userInfo.verifier,
            verifierId: userInfo.verifierId
        }))
        let amountAsHex = web3.toHex(10)
        let encoded = web3.fromAscii("\x19Ethereum Signed Message:\n" + amountAsHex.length + amountAsHex)
        let accounts = web3.eth.accounts
        console.log(accounts[0])
        let signature = await web3.persddcddddonal.sign(encoded, accounts[0])
        console.log(signature)
        let address = await web3.personal.ecRecover(signature)
        console.log('address', address)
    },2000)
    //window.torus.showTorusButton( false )

})