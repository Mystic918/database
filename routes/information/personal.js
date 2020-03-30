const clinet = require('../../conf/db.js');


exports.getpersonalList=async(ctx,next)=>{ 
	const username =  ctx.request.query.username   //没表单post请求
			// const username = ctx.request.body.username   //有表单post请求 
			const sql = "select b.doc_id , b.title , b.content , b.author , b.create_time , b.user_id , b.hot , b.pic from user as a , document as b where b.user_id = a.id and a.username='"+username+"'";
			await clinet.query(sql,[]).then((result)=>{
 
						ctx.response.status=200
				 		ctx.response.body={code:200,msg:"success",data:result}
			})
		 
}
exports.PublishContent=async(ctx,next)=>{
	 	let title = ctx.request.body.ext_title 
	 	let content = ctx.request.body.ext_content||'' 
	 	let author = ctx.request.body.ext_author 
	 	let create_time = ctx.request.body.ext_create_time 
	 	let user_id = ctx.request.body.ext_user_id 
	 	let classes = ctx.request.body.ext_classes 
	 	let pic = ctx.request.body.ext_pic || ''
	 	if(title==undefined||author==undefined||create_time==undefined||user_id==undefined||classes==undefined){
						ctx.response.status=200
				 		ctx.response.body={code:404,msg:"faill",data:"信息缺少"}
				 		return 
	 	}
	 	const sql = "INSERT INTO document (title,content,author,create_time,user_id,classes,pic) VALUES ('"+title+"','"+content+"','"+author+"','"+create_time+"','"+user_id+"','"+classes+"','"+pic+"')";
			await clinet.query(sql,[]).then((result)=>{
 
						ctx.response.status=200
				 		ctx.response.body={code:200,msg:"success",data:"添加成功"}
			})
	
} 		