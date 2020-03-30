const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const websocket = require("koa-websocket")(app)
const util = require('util')
const jwt = require("jsonwebtoken")
const verify = util.promisify(jwt.verify) // 解密
const jwkoa = require('koa-jwt')
const index = require('./routes/index')
const users = require('./routes/users')
const information = require('./routes/information/index')
const PersonalCenter = require('./routes/PersonalCenter/index')
const public = require('./routes/public/index')
const wsocket = require('./routes/websocket/index')
const { verifyToken } = require('./conf/verify')
// const session = require('koa-session');
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public/uploads/'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))



app.use(verifyToken)

app.use((ctx,next)=>{
    return next().catch((error)=>{
        if(error.status === 401){
            ctx.status = 401;
            ctx.body = {
                code:-1,
                msg:"错误处理"
            }
        }
        else{
            throw error;
        }
    });
});



app.use(jwkoa({
  secret: 'my_token'
}).unless({
  path: [/\/PersonalCenter\/login/,/\/public\/[A-Za-z0-9]{1,}/]
}));


// 容错处理






// 错误处理
// app.use( (ctx, next) => {
//   const token = ctx.header.authorization
//     console.log("这是token:"+token)
//    jwt.verify(token,"my_token",(error, decoded) => {
//       if (error) {
//         ctx.response.status=401
//             ctx.response.body={code:401,msg:"faill",data:"异常"}
//         return
//       }
//       console.log("decoded:"+decoded)
//       next()
//     })

//     return next().catch((err) => {
//         if(err.status === 401){
//             ctx.response.status=401
//             ctx.response.body={code:401,msg:"faill",data:"异常"}
//         }else{
//             throw err;
//         }
//     })
// })



 

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
 // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



// app.keys = ['some secret hurr'];
// const CONFIG = {
//    key: 'koa:sess',   //cookie key (default is koa:sess)
//    // maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
//    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
//    overwrite: true,  //是否可以overwrite    (默认default true)
//    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
//    signed: true,   //签名默认true
//    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
//    renew: false,  //(boolean) renew session when session is nearly expired,
// };
// app.use(session(CONFIG, app));


websocket.ws.use(wsocket.routes(), wsocket.allowedMethods())
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(PersonalCenter.routes(), PersonalCenter.allowedMethods())
app.use(public.routes(), public.allowedMethods())


// app.use(async (ctx,next)=>{
//     let token = ctx.request.body.token
//     let tokenServer = ctx.session.token
//     console.log(token)
//     console.log(tokenServer)
//     if(tokenServer){
//            if(token===ctx.session.token){
//               next()
//             }else{
//                     ctx.response.status=200
//                     ctx.response.body={code:404,msg:"faill",data:"未登录"}
//              } 
//       }else{
//         next()
//       }
// })
 
// routes

app.use(information.routes(), information.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(8087,()=>{
	console.log("start server ...  http://localhost:8087")
})

module.exports = app
