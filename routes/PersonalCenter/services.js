const clinet = require('../../conf/db.js');
const url = require('url')
let uuid = require('uuid')
let Base64 = require('js-base64').Base64
const jwt = require("jsonwebtoken")

// 加密
const crypto = require('crypto');
// 创建加密数据
var cryptoPassFunc = function(str) {
  const md5 = crypto.createHash('md5');
  return md5.update(str).digest('hex');
};






 // 登录接口
exports.login = async (ctx, next) => {
	const username = ctx.request.body.username
	const password = cryptoPassFunc(ctx.request.body.password)
	console.log("password jm:"+cryptoPassFunc(ctx.request.body.password))
 	const sql = 'select * from  user where username = "'+ username+'" and password = "'+password+'"'
	 	await clinet.query(sql,[]).then((rs)=>{
	 		if(rs.length){
	 			let result=rs[0]


	 			        const token = jwt.sign({
							name: result.username,
							_id: result.id
						}, 'my_token', { expiresIn: '2h' });

	 			// ctx.session.user = username
	 			// ctx.session.token = token
	
	 			let msg=Base64.encode(JSON.stringify({
	 				username:result.username,
	 				id:result.id,
	 				isadmin:result.isadmin
	 			}))

	 			// console.log(ctx.session.token)
		 		ctx.response.status=200
		 		ctx.response.body={code:200,msg:msg,Token:token}
	 		}else if(!rs.length){
		 		ctx.response.status=200
		 		ctx.response.body={code:404,msg:"faill"}
		 	}

 	})
}
// 注销接口
exports.ResetLogin = async (ctx, next) => {
			const username = ctx.request.body.username  
			 	await clinet.query(sql,[]).then((result)=>{
			 		if(result.length){ 
				 		ctx.response.status=200
				 		ctx.response.body={code:200,msg:"success"}
			 		}else if(!result.length){
				 		ctx.response.status=200
				 		ctx.response.body={code:404,msg:"faill"}
				 	}

		 	})

}


// 注册接口
exports.register = async(ctx,next)=>{
	const username = ctx.request.body.username	
	const password = cryptoPassFunc(ctx.request.body.password)
	const sql =  'select * from  user where username = "'+ username+'"'
 	const sql2 = "insert into user (username,password) values ('"+username+"','"+password+"')"  

              let isclude = await clinet.query(sql,[]).then((result)=>{
              		return result.length
              }) 
              if(isclude===0){
              	 	 await clinet.query(sql2,[]).then((result2)=>{
					 ctx.response.status=200
			 	     ctx.response.body={code:200,msg:"success",data:"用户创建成功"}
					})
              }else{
              		ctx.response.status=200
			      	ctx.response.body={code:404,msg:"faill",data:"用户已存在"}
              }
 

		// await clinet.query(sql,[]).then((result)=>{ 
		// 	if(result.length===0){ 
		// 	   clinet.query(sql2,[]).then((result2)=>{
		// 			 ctx.response.status=200
		// 	 	     ctx.response.body={code:200,msg:"success",data:"用户创建成功"}
		// 		})
		// 	}
		// 	else{
		// 		ctx.response.status=200
		// 	 	ctx.response.body={code:404,msg:"faill",data:"用户已存在"}
		// 	}
		// }) 
}