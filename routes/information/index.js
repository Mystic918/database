const router = require('koa-router')()
// const services = require('./services.js')
const personal = require('./personal.js')
//自动加上路由前准
router.prefix('/information')
const formidable =require('formidable')
const multer =require('koa-multer')

let storage = multer.diskStorage({
	destination:function(req,file,cb){
			cb(null,__dirname + '/../../public/uploads/images')
	},
	filename:function(req,file,cb){
		const fileFormat = (file.originalname).split(".")
		cb(null,Date.now()+"."+fileFormat[fileFormat.length-1])
	}

})

const upload = multer({ storage: storage })

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })
// 获取全部文档、获取内容文档、获取专项文档、获取全项分类文档、获取个人文档、 迁移到 public
// router.get('/getDocument', services.getdocument)
// router.get('/getContent', services.getcontent)
// router.get('/getChan', services.getchan)
// router.get('/getchannel', services.getchannel)
// router.get('/getclasses', services.getclasses)
router.post('/getpersonalList', personal.getpersonalList) 
// router.post('/uploadfile', personal.uploadfile) 
router.post('/PublishContent', personal.PublishContent) 

router.post('/uploadimg', upload.single('mypic'),async (ctx, next) => { 
 
		console.log(__dirname + '/../../public/uploads')
	 		 ctx.response.status=200
		ctx.response.body=  {
				isok:false,
				filename:ctx.req.file.filename,
				url:"/api/images/"+ctx.req.file.filename   //这里待会儿要改
			}
 

}) 


router.post('/uploadimg2', upload.single('file'),async (ctx, next) => { 
 
		ctx.response.body=  {
				isok:false,
				filename:ctx.req.file.filename,
				url:"/api/images/"+ctx.req.file.filename   //这里待会儿要改
			}

//131疫情专题
//309
	
}) 
module.exports = router
