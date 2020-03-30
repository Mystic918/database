const router = require('koa-router')()
const services = require('./services.js')  

router.all('/getDocument', services.WebSocket) 

module.exports = router
