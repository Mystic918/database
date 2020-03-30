const router = require('koa-router')()
const services = require('./services.js')
//自动加上路由前准
router.prefix('/PersonalCenter')

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })
// 登录、注销、注册
router.post('/login', services.login) 
router.post('/ResetLogin', services.ResetLogin) 
router.post('/register', services.register) 


module.exports = router
