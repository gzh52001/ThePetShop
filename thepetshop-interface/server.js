const express = require('express')

//导入路由：本质就是一个中间件
const AllRouter = require('./routers/index')

const app = express();

// CORS跨越
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
        res.sendStatus(200);/*让options请求快速返回*/
    } else{
        next();
    }
});

app.use(express.static('/'));//静态资源服务器
app.use(AllRouter)

app.listen("3099",()=>{
    console.log("服务器已开启，请访问http://localhost:3099")
})