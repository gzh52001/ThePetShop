const express = require('express')
const router = express.Router()

const usersRouter = require('./modules/user')
const goodsRouter = require('./modules/goods')
const adminRouter = require('./modules/admin')

router.use('/user',usersRouter)
router.use('/goods',goodsRouter)
router.use('/admin',adminRouter)

router.use("/home",(req,res)=>{
    res.send("进入了路由")
})

module.exports = router