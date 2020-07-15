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
            p.forEach(item=>{
                item.gimgs = JSON.parse(item.gimgs).length == 0 ? JSON.parse(item.gimgs)[0] : JSON.parse(item.gimgs)[1]
            })
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
        let sql = `select gid,gtitle,gprice,gxiaoliang,gimgs from goodsinfo where gtitle like '%${gtitle}%'`;
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

// 随机获取指定数量的数据
router.get('/randomgoods',async(req,res) => {
    let { num } = req.query
    num = num || 6
    try {
        let sql = `SELECT gid,gimgs,gtitle,gprice FROM goodsinfo WHERE gid >= ((SELECT MAX(gid) FROM goodsinfo)-(SELECT MIN(gid) FROM goodsinfo)) * RAND() + (SELECT MIN(gid) FROM goodsinfo) LIMIT ${num}`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            p.forEach(item=>{
                item.gimgs = JSON.parse(item.gimgs).length==1?JSON.parse(item.gimgs)[0]:JSON.parse(item.gimgs)[1]
            })
            inf = {
                code: 2000,
                flag: true,
                message: `成功,已随机获取${num}条数据`,
                data:p
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '服务器出错'
        }
        res.send(inf);
    }
})

// 获取某些商品购买数最高的商品
router.get('/buysTop',async(req,res) => {
    let { value,num } = req.query
    value = value || ''
    try {
        // select * from allgoods where title REGEXP '${str}'
        let sql = `SELECT * FROM goodsinfo where title REGEXP '${value}' ORDER BY buys DESC LIMIT ${num}`;
        if(!value){
            sql = `SELECT * FROM goodsinfo ORDER BY buys DESC LIMIT ${num}`;
        }
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: `成功,已获取${num}条数据`,
                data:p
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '获取失败，没有此数据商品'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})

module.exports = router