const jwt = require('jsonwebtoken');

async function verifyToken(ctx, next) {
let msg = ctx.header.authorization
console.log("123"+msg)
console.log("456"+ctx.header)
 if (ctx.header && ctx.header.authorization) {
  const parts = ctx.header.authorization.split(' ');
  if (parts.length === 2) {
   //取出token
   const scheme = parts[0];
   const token = parts[1];
   if (/^Bearer$/i.test(scheme)) {
    try {
     //jwt.verify方法验证token是否有效
     jwt.verify(token, secret.sign, {
      complete: true
     });
    } catch (error) {
    	ctx.response.status=200
		ctx.response.body={code:404,msg:"token过期"}
     //token过期 生成新的token
     // const newToken = getToken(user);
     // //将新token放入Authorization中返回给前端
     // ctx.res.setHeader('Authorization', newToken);
    }
   }
  }
 }
 return next().catch(err => {
  if (err.status === 401) {
   ctx.status = 401;
   ctx.body =
    'Protected resource, use Authorization header to get access\n';
  } else {
   throw err;
  }});
 }
module.exports={verifyToken} 