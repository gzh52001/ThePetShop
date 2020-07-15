const express = require('express')
const bodyParser = require('body-parser')

const query = require("../../db/mysql")

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

//获取所有商品，传入tid 获取某一分类商品
router.get('/allgoods', async (req, res) => {
    let tid = req.query.tid
    let sql
    let inf
    if (tid) {
        sql = `select gid,gtitle,gimgs,gprice,gxiaoliang from goodsinfo where tid='${tid}'`
    } else {
        sql = `select gid,gtitle,gimgs,gprice,gxiaoliang from goodsinfo`
    }
    try {
        let p = await query(sql);
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: '获取成功',
                data: p
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '获取失败'
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: err.errno,
            flag: false,
            message: '服务器出错'
        }
        res.send(inf)
    }
})

//获取某一商品信息
router.get('/goodsinfo', async (req, res) => {
    let gid = req.query.gid
    let inf
    try {
        let sql = `select * from goodsinfo where gid='${gid}'`
        let p = await query(sql)
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: "获取成功",
                data: p
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: "获取失败"
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: err.errno,
            flag: false,
            message: "服务器出错"
        }
        res.send(inf)
    }
})

//模糊搜索商品
router.get('/searchgoods',async(req,res)=>{
    let {gtitle} = req.query
    console.log(gtitle)
    let inf
    try{
        let sql = `select gid,gtitle from goodsinfo where gtitle like '%${gtitle}%'`;
        let p = await query(sql)
        console.log(p)
        if(p.length){
            inf = {
                code:2000,
                flag:true,
                message:'搜索成功',
                data:p
            }
            res.send(inf)
        }else{
            inf = {
                code:3000,
                flag:false,
                message:'搜索失败'
            }
            res.send(inf)
        }
    }catch(err){
        inf= {
            code:err.errno,
            flag:false,
            message:'服务器出错'
        }
        res.send(inf)
    }
})
module.exports = router