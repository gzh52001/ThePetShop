const express = require('express')
const bodyParser = require('body-parser')

const query = require("../../db/mysql")

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

//获取所有商品，传入tid 获取某一分类商品
router.get('/allgoods', async (req, res) => {
    let { tid, page, num } = req.query
    console.log(page,num)
    page = page || 1
    num = num || 8
    let index = (page - 1) * num
    let sql
    let inf
    if (tid > 0) {
        sql = `select tid,gid,gtitle,gimgs,gprice,gxiaoliang from goodsinfo where tid='${tid}' limit ${index},${num}`
    } else if (tid == 0) {
        // `select gid,gtitle,gimgs,gprice,gxiaoliang from goodsinfo limit ${index},${num}`
        sql = `SELECT gid,gtitle,gimgs,gprice,gxiaoliang FROM goodsinfo WHERE gid >= ((SELECT MAX(gid) FROM
         goodsinfo)-(SELECT MIN(gid) FROM goodsinfo)) * RAND() + (SELECT MIN(gid) FROM goodsinfo) LIMIT ${index},${num}`
    }
    try {
        let p = await query(sql);
        if (p.length) {
            p.forEach(item => {
                item.gimgs = JSON.parse(item.gimgs).length == 1 ? JSON.parse(item.gimgs)[0] : JSON.parse(item.gimgs)[1]
            })
            let totle = await query(`select * from goodsinfo where tid='${tid}'`)
            if (tid > 0) {
                let goodstype = await query(`select goodstype from goodstype where tid='${tid}'`)
                goodstype = goodstype[0].goodstype
                inf = {
                    code: 2000,
                    flag: true,
                    message: '获取成功',
                    data: {
                        totle:totle.length,
                        page: page,
                        num: num,
                        goodstype,
                        goodsinfo: p
                    }
                }
            } else {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '获取成功',
                    data: {
                        totle:totle.length,
                        page: page,
                        num:  num ,
                        goodstype: "宠物精选",
                        goodsinfo: p
                    }
                }
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

//获取商品详情
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

//模糊搜索商品(*)
router.get('/searchgoods', async (req, res) => {
    let { gtitle } = req.query
    console.log(gtitle)
    let inf
    try {
        let sql = `select gid,gtitle,gprice,gxiaoliang,gimgs from goodsinfo where gtitle like '%${gtitle}%'`;
        let p = await query(sql)
        console.log(p)
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: '搜索成功',
                data: p
            }
            res.send(inf)
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '搜索失败'
            }
            res.send(inf)
        }
    } catch (err) {
        inf = {
            code: err.errno,
            flag: false,
            message: '服务器出错'
        }
        res.send(inf)
    }
})

// 随机获取指定数量的数据
router.get('/randomgoods', async (req, res) => {
    let { num } = req.query
    num = num || 6
    try {
        let sql = `SELECT gid,gimgs,gtitle,gprice FROM goodsinfo WHERE gid >= ((SELECT MAX(gid) FROM goodsinfo)-(SELECT MIN(gid) FROM goodsinfo)) * RAND() + (SELECT MIN(gid) FROM goodsinfo) LIMIT ${num}`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            p.forEach(item => {
                item.gimgs = JSON.parse(item.gimgs).length == 1 ? JSON.parse(item.gimgs)[0] : JSON.parse(item.gimgs)[1]
            })
            inf = {
                code: 2000,
                flag: true,
                message: `成功,已随机获取${num}条数据`,
                data: p
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

// 搜索商品和排序
router.get('/searchandsort', async (req, res) => {
    let { value, page, num, sort } = req.query
    console.log(value, page, num, sort)
    value = value || ''
    page = page || 1
    num = num || 8
    index = (page - 1) * num
    let sql
    //order by 字段 desc 倒序 , order by 字段  正序
    if (sort == "0") {
        sql = `SELECT gid,gimgs,gtitle,gprice,gxiaoliang FROM goodsinfo where gtitle REGEXP '${value}' ORDER BY gxiaoliang DESC LIMIT ${index},${num}`;
    } else if (sort == "1") {
        sql = `SELECT gid,gimgs,gtitle,gprice,gxiaoliang FROM goodsinfo where gtitle REGEXP '${value}' ORDER BY gprice DESC LIMIT ${index},${num}`;
    } else {
        sql = `SELECT gid,gimgs,gtitle,gprice,gxiaoliang FROM goodsinfo where gtitle REGEXP '${value}' LIMIT ${index},${num}`;
    }
    try {
        let p = await query(sql);//[{},{}]
        // select * from allgoods where title REGEXP '${str}'
        let inf = {}
        if (p.length) {
            p.forEach(item => {
                item.gimgs = JSON.parse(item.gimgs).length == 1 ? JSON.parse(item.gimgs)[0] : JSON.parse(item.gimgs)[1]
            })
            inf = {
                code: 2000,
                flag: true,
                message: `成功,已获取${num}条数据`,
                data: p
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '获取失败，没有此商品数据'
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

module.exports = router