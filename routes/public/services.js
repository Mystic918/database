const clinet = require('../../conf/db.js');
const url = require('url')
// 获取所有文档
exports.getdocument = async (ctx, next) => {
	
	let sql=""; //sql 语句
	const page = url.parse(ctx.request.url,true).query.page || 1 //开始取
	const number = url.parse(ctx.request.url,true).query.number || 5 //数目
	 const end = url.parse(ctx.request.url,true).query.number || 9999 //数目
   sql = 'select * from  document ORDER BY create_time DESC'
   // sql2 = 'select * from  document ORDER BY create_time DESC LIMIT '+((page-1)*number)+','+end 
 	console.log(url.parse(ctx.request.url,true).query)
 	await clinet.query(sql,[]).then((result)=>{
 		const len = result.length;
 		const pageNumber = Math.ceil(len/number)

 
 		if(page<=pageNumber){
 					let arr = result.splice(((page-1)*number),number)
 			 		if(result.length!==0){
 			 		ctx.response.status=200
 					ctx.response.body={code:200,msg:"success",data:arr,page:pageNumber,count:len}
			 		}
 		}else{
 			      ctx.response.status=200
			 		ctx.response.body={code:404,msg:"faill",data:"没数据了"}
 		}


 	})
}
// 根据docid获取当篇内容
exports.getcontent = async (ctx, next) => {

let doc_id = url.parse(ctx.request.url,true).query.docid
 	// const sql = 'select * from  document as a , classes as b where a.doc_id='+url.parse(ctx.request.url,true).query.docid +'and b.classes_id=a.classes'
 	const sql = 'select * from  document as a , classes as b where a.doc_id='+doc_id+' and b.classes_id=a.classes'
  // console.log(sql)
 	// console.log(url.parse(ctx.request.url,true).query)
 	// console.log(url.parse(ctx.request.url,true).query.docid)
 	await clinet.query(sql,[]).then((result)=>{
 		ctx.response.status=200
 		ctx.response.body={code:200,msg:"success",data:result}
 	})
 	 	next()
}
// 根据专栏筛选文档
exports.getchan = async (ctx, next) => {
	const page = url.parse(ctx.request.url,true).query.page || 1 //开始取
	const number = url.parse(ctx.request.url,true).query.number || 5 //数目
	const classes = url.parse(ctx.request.url,true).query.classes
	console.log(page)
	console.log(number)
	console.log(classes)
		if(classes){
		 	const sql = 'SELECT a.doc_id, a.title, a.content, a.author, a.create_time, a.user_id, a.hot, a.pic, b.NAME  FROM document AS a, classes AS b  WHERE a.classes = b.classes_id  AND b.NAME LIKE "'+classes+'"'
  // console.log(sql)
		 	console.log(url.parse(ctx.request.url,true).query)
		 	// console.log(url.parse(ctx.request.url,true).query.docid)
		 	await clinet.query(sql,[]).then((result)=>{
			 			const len = result.length;
				 		const pageNumber = Math.ceil(len/number)
				 		// console.log(pageNumber)
				 		// console.log(result)
				 		if(page<=pageNumber){
				 			 		if(result.length!==0){
				 			 			
				 					let arr = result.splice(((page-1)*number),number)
				 			 		ctx.response.status=200
				 					ctx.response.body={code:200,msg:"success",data:arr,page:pageNumber,count:len}
							 		}
				 		}else{
				 			      ctx.response.status=200
							 		ctx.response.body={code:404,msg:"faill",data:"没数据了"}
				 		}
		 	})
		 }else{
		 		ctx.response.status=404
		 	    ctx.response.body={code:404,msg:"faill"}
		 }
 	next()
}
// 获取专栏类型
exports.getchannel = async (ctx, next) => {

			let list =[];
 
		 	const sql = 'SELECT *  FROM document AS a, classes AS b  WHERE a.classes = b.classes_id '
  // console.log(sql)
		 	// console.log(url.parse(ctx.request.url,true).query)
		 	// console.log(url.parse(ctx.request.url,true).query.docid)
		 	await clinet.query(sql,[]).then((result)=>{  
				 	 for(let i =0 ; i<result.length;i++){
								console.log(result[i].name)
				 	 	if(include(result[i].name,list)){
				 	 		 addList(result[i],list)
				 	  
				 	 	}else{

				 	 		 list.push({"classes":result[i].name,"lists":[result[i]]})
				 	 		 console.log(2)
				 	 	} 

				 	 }
		 		ctx.response.status=200
		 		ctx.response.body={code:200,msg:"success",data:list}
				 	})
		 
		 	next()
}

// 获取热门类型
exports.gethot = async (ctx, next) => {
 
 	const page = url.parse(ctx.request.url,true).query.page || 1 //开始取
	const number = url.parse(ctx.request.url,true).query.number || 5 //数目
	 // const end = url.parse(ctx.request.url,true).query.number || 9999 //数目
	 console.log(page,number)
		 	const sql = 'SELECT *  FROM document AS a  WHERE a.hot>0  ORDER BY hot DESC'
  // console.log(sql)
		 	// console.log(url.parse(ctx.request.url,true).query)
		 	// console.log(url.parse(ctx.request.url,true).query.docid)
		 	await clinet.query(sql,[]).then((result)=>{  
			 				const len = result.length; 
					 		const pageNumber = Math.ceil(len/number) 
					 		// console.log(pageNumber)
					 		// console.log(result)
					 
					 		if(page<=pageNumber){
					 			 		if(result.length!==0){
					 					let arr = result.splice(((page-1)*number),number)
					 					console.log(arr)
					 			 		ctx.response.status=200
					 					ctx.response.body={code:200,msg:"success",data:arr,page:pageNumber,count:len}
								 		}
					 		}else{
					 			      ctx.response.status=200
								 		ctx.response.body={code:404,msg:"faill",data:"没数据了"}
					 		}

				 	})
		 
		 	next()
}

// 获取专栏类型
exports.getclasses = async (ctx, next) => {
	const sql = "select * from classes"
	 await clinet.query(sql,[]).then(result=>{
	 	console.log(result)
		ctx.response.status=200
 		ctx.response.body={code:200,msg:"success",data:result}
	 })
}
// 前端登录验证
exports.Verification = async (ctx, next) => {
	let Verification = ctx.request.body.token
	if (ctx.session.token.toString()===Verification.toString()) {	 
			  ctx.response.status=200
			  ctx.response.body={code:200,msg:"success"}
	}
	else{
		ctx.response.status=200
		ctx.response.body={code:404,msg:"faill"}
	}
}




// 判断是否存在
function include(state,arr){
	for (let i = 0; i< arr.length; i++) {
		if(arr[i].classes.toString()==state.toString()){
			return true
		}
		return false
	}
}
// 向同类中插入数据  str需要插入的数据  arr：集合里存在的类别
function addList(str,arr){
	for(let i =0 ; i<arr.length;i++){
			if(arr[i].classes==str.name){
				arr[i].lists.push(str)
			}
	}
}

// /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,32}$/;

// Gzws@312
