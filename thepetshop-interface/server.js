const express = require('express')

//导入路由：本质就是一个中间件
const AllRouter = require('./routers/index')

const app = express();

app.use(express.static('/'));//静态资源服务器
app.use(AllRouter)

app.listen("3099",()=>{
    console.log("服务器已开启，请访问http://localhost:3099")
})