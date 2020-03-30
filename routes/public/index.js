const router = require('koa-router')()
const services = require('./services.js') 
//自动加上路由前准
router.prefix('/public')

const multer =require('koa-multer')

let storage = multer.diskStorage({
	destination:function(req,file,cb){
			cb(null,__dirname + '/../../public/uploads')
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
// 获取全部文档、获取内容文档、获取专项文档、获取全项分类文档、获取个人文档、
router.get('/getDocument', services.getdocument)
router.get('/getContent', services.getcontent)
router.get('/getChan', services.getchan)
router.get('/getchannel', services.getchannel)
router.get('/getclasses', services.getclasses)
router.get('/gethot', services.gethot)
router.post('/Verification', services.Verification)

module.exports = router
