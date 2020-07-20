const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const session = require("express-session")

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const usersRouter = require('./modules/user')
const goodsRouter = require('./modules/goods')
const adminRouter = require('./modules/admin')

router.use('/user',usersRouter)
router.use('/goods',goodsRouter)
router.use('/admin',adminRouter)

router.use("/home",(req,res)=>{
    res.send("进入了路由")
})
router.use(session({
    secret: 'a1dk3ddsf2d',	// 加密存储（加盐）
    // resave是指每次请求都重新设置session cookie，
    // 假设你的cookie是10分钟过期，每次请求都会再设置10分钟
    resave: false,		  	
    saveUninitialized: true,   // 初始化session存储 
    cookie: {maxAge: 60000}	// 过期时间/毫秒  1分钟=60秒=1000*60  
}))

module.exports = router