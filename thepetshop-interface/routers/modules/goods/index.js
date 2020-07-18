const express = require('express')

const query = require("../../db/mysql")

const router = express.Router()

//获取所有商品，传入tid 获取某一分类商品  排序
router.get('/allgoods', async (req, res) => {
    let { tid, page, num, sort } = req.query
    // console.log(page,num)
    page = page - 0 || 1
    num = num - 0 || 8
    let index = (page - 1) * num
    let sql
    let inf
    if (tid > 0) {
        sql = `select tid,gid,gtitle,gimgs,gprice,gxiaoliang from goodsinfo where tid='${tid}' limit ${index},${num}`
    } else if (tid == 0) {
        // `select gid,gtitle,gimgs,gprice,gxiaoliang from goodsinfo limit ${index},${num}`
        sql = `SELECT gid,gtitle,gimgs,gprice,gxiaoliang FROM goodsinfo WHERE gid >= ((SELECT MAX(gid) FROM
         goodsinfo)-(SELECT MIN(gid) FROM goodsinfo)) * RAND() + (SELECT MIN(gid) FROM goodsinfo) LIMIT ${index},${num}`
    } else {
        if (sort == 0) {
            sql = `select gid,gtitle,gimgs,gprice,gxiaoliang from goodsinfo order by gxiaoliang LIMIT ${index},${num}`
        } else if (sort == 1) {
            sql = `select gid,gtitle,gimgs,gprice,gxiaoliang from goodsinfo order by gxiaoliang desc LIMIT ${index},${num}`
        } else if (sort == 2) {
            sql = `select gid,gtitle,gimgs,gprice,gxiaoliang from goodsinfo order by gprice LIMIT ${index},${num}`
        } else if (sort == 3) {
            sql = `select gid,gtitle,gimgs,gprice,gxiaoliang from goodsinfo order by gprice desc LIMIT ${index},${num}`
        } else if(sort == 4){
            sql = `select gid,gtitle,gimgs,gprice,gxiaoliang from goodsinfo order by gid desc LIMIT ${index},${num}`
        }else{
            sql = `select gid,gtitle,gimgs,gprice,gxiaoliang from goodsinfo order by gid LIMIT ${index},${num}`
        }
    }
    try {
        let p = await query(sql);
        if (p.length) {
            p.forEach(item => {
                item.gimgs = JSON.parse(item.gimgs).length == 1 ? JSON.parse(item.gimgs)[0] : JSON.parse(item.gimgs)[1]
            })
            let total1 = await query(`select * from goodsinfo where tid='${tid}'`)
            let total2 = await query(`select * from goodsinfo`)
            if (tid > 0) {
                let goodstype = await query(`select goodstype from goodstype where tid='${tid}'`)
                goodstype = goodstype[0].goodstype
                inf = {
                    code: 2000,
                    flag: true,
                    message: '获取成功',
                    data: {
                        total: total1.length,
                        page: page - 0,
                        num: num - 0,
                        goodstype,
                        goodsinfo: p
                    }
                }
            } else if (tid == 0) {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '获取成功',
                    data: {
                        total: total2.length,
                        page: page - 0,
                        num: num - 0,
                        goodstype: "宠物精选",
                        goodsinfo: p
                    }
                }
            } else {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '获取成功',
                    data: {
                        total: total2.length,
                        page: page - 0,
                        num: num - 0,
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

//获取商品分类
router.get('/getclassify', async (req, res) => {
    let sql = `select * from goodstype`
    try {
        let p = await query(sql)
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
            flag: true,
            message: '服务器错误'
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
    // console.log(gtitle)
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
    // console.log(value, page, num, sort)
    value = value || ''
    page = page || 1
    num = num || 8
    index = (page - 1) * num
    let sql
    //order by 字段 desc 倒序 , order by 字段  正序
    if (sort == "0") {
        sql = `SELECT gid,gimgs,gtitle,gprice,gxiaoliang,ghot FROM goodsinfo where gtitle REGEXP '${value}' ORDER BY gxiaoliang DESC LIMIT ${index},${num}`;
    } else if (sort == "1") {
        sql = `SELECT gid,gimgs,gtitle,gprice,gxiaoliang,ghot FROM goodsinfo where gtitle REGEXP '${value}' ORDER BY gprice DESC LIMIT ${index},${num}`;
    } else if (sort == "2") {
        sql = `SELECT gid,gimgs,gtitle,gprice,gxiaoliang,ghot FROM goodsinfo where gtitle REGEXP '${value}' ORDER BY gprice LIMIT ${index},${num}`;
    } else if (sort == "3") {
        sql = `SELECT gid,gimgs,gtitle,gprice,gxiaoliang,ghot FROM goodsinfo where gtitle REGEXP '${value}' ORDER BY ghot DESC LIMIT ${index},${num}`;
    } else {
        sql = `SELECT gid,gimgs,gtitle,gprice,gxiaoliang,ghot FROM goodsinfo where gtitle REGEXP '${value}' LIMIT ${index},${num}`;
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

//添加购物车
router.get('/addcart', async (req, res) => {
    let { uid, gid, count, gsize } = req.query
    console.log(uid, gid, count, gsize)
    let inf
    try {

        let p1 = await query(`select * from goodscart where uid='${uid}' and gid='${gid}' and gsize='${gsize}'`)
        if (p1.length) {
            count = count - 0 + p1[0].count - 0
            let p2 = await query(`update goodscart set count=${count} where uid='${uid}' and gid='${gid}' and gsize='${gsize}'`)
            if (p2.affectedRows) {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '添加成功'
                }
            } else {
                inf = {
                    code: 3000,
                    flag: false,
                    message: '添加失败'
                }
            }
        } else {
            let p3 = await query(`insert goodscart(uid,gid,count,gsize) values('${uid}','${gid}','${count}','${gsize}')`)
            if (p3.affectedRows) {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '添加成功'
                }
            } else {
                inf = {
                    code: 3000,
                    flag: false,
                    message: '添加失败'
                }
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: err.errno,
            flag: false,
            message: '服务器错误'
        }
        res.send(inf)
    }
})

//获取购物车商品
router.get('/getcart', async (req, res) => {
    let { uid } = req.query
    try {
        let p = await query(`select gid,count,gsize,ischeck from goodscart where uid='${uid}'`)
        let str = ''
        // console.log(p)
        p.forEach(item => {
            str += `${item.gid},`
        })
        str = str.substr(0, str.length - 1)
        if (p.length) {
            let result = await query(`select gid,gimgs,gtitle,gprice,gxiaoliang,gsize from goodsinfo where gid in(${str})`)
            if (result) {
                result.forEach(item => {
                    item.gimgs = JSON.parse(item.gimgs).length == 1 ? JSON.parse(item.gimgs)[0] : JSON.parse(item.gimgs)[1]
                })
                p.forEach(item1 => {
                    result.forEach(item2 => {
                        if (item1.gid == item2.gid) {
                            item1.gsize = JSON.parse(item2.gsize)[item1.gsize]
                            item1.gimgs = item2.gimgs
                            item1.gtitle = item2.gtitle
                            item1.gprice = item2.gprice
                        }
                    })
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
                    message: '获取失败',
                    data: result
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
            message: '服务器错误'
        }
        res.send(inf)
    }
})

//购物车删除
router.delete('/delcart', async (req, res) => {
    let { uid, gid, gsize } = req.body
    // console.log(uid, gid, gsize)
    let inf
    try {
        let result = await query(`select gsize from goodsinfo where gid='${gid}'`)
        gsize = JSON.parse(result[0].gsize).indexOf(gsize)
        let p = await query(`delete from goodscart where uid='${uid}' and gid='${gid}' and gsize='${gsize}'`)
        if (p.affectedRows) {
            inf = {
                code: 2000,
                flag: true,
                message: '删除成功'
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '删除失败'
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: err.errno,
            flag: false,
            message: '服务器错误'
        }
        res.send(inf)
    }
})

//购物车批量删除
router.delete('/delcartpart', async (req, res) => {
    let sql = `delete from goodscart where ischeck='1'`
    try {
        let p = await query(sql)
        if (p.affectedRows) {
            inf = {
                code: 2000,
                flag: true,
                message: '删除成功'
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '删除失败'
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: err.errno,
            flag: false,
            message: '服务器错误'
        }
        res.send(inf)
    }
})

//购物车选中
router.put('/checkcart', async (req, res) => {
    let { uid, gid, gsize, check } = req.body
    console.log(uid, gid, gsize, check)
    if (check == "true") {
        check = 1
    } else {
        check = 0
    }
    let inf
    try {
        let result = await query(`select gsize from goodsinfo where gid='${gid}'`)
        gsize = JSON.parse(result[0].gsize).indexOf(gsize)
        let p = await query(`update goodscart set ischeck='${check}' where uid='${uid}' and gid='${gid}' and gsize='${gsize}'`)
        if (p.affectedRows) {
            inf = {
                code: 2000,
                flag: true,
                message: '选中成功'
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '选中失败'
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: err.errno,
            flag: false,
            message: '服务器错误'
        }
        res.send(inf)
    }
})

//购物车改变数量
router.put('/changecartcount', async (req, res) => {
    let { uid, gid, gsize, count } = req.body
    // console.log(uid,gid,gsize,count)
    let inf
    try {
        let result = await query(`select gsize from goodsinfo where gid='${gid}'`)
        gsize = JSON.parse(result[0].gsize).indexOf(gsize)
        let p = await query(`update goodscart set count=${count} where uid='${uid}' and gid='${gid}' and gsize='${gsize}'`)
        if (p.affectedRows) {
            inf = {
                code: 2000,
                flag: true,
                message: '修改成功'
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '修改失败'
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: err.errno,
            flag: true,
            message: '服务器错误'
        }
        res.send(inf)
    }
})

//添加订单
router.get('/addorder', async (req, res) => {
    let inf="dd"
    try {
        let p = await query(`select uid,gid,count,gsize from goodscart where ischeck='1'`)
        if (p.length) {
            p.forEach(async item => {
                let { uid, gid, count, gsize } = item
                let p1 = await query(`select * from goodsorder where uid='${uid}' and gid='${gid}' and gsize='${gsize}'`)
                if (p1.length) {
                    count = count - 0 + p1[0].count - 0
                    let p2 = await query(`update goodsorder set count=${count} where uid='${uid}' and gid='${gid}' and gsize='${gsize}'`)
                    if (p2.affectedRows) {
                        inf = {
                            code: 2000,
                            flag: true,
                            message: '添加成功'
                        }
                    } else {
                        inf = {
                            code: 3000,
                            flag: false,
                            message: '添加失败'
                        }
                    }
                } else {
                    let p3 = await query(`insert goodsorder(uid,gid,count,gsize) values('${uid}','${gid}','${count}','${gsize}')`)
                    if (p3.affectedRows) {
                        inf = {
                            code: 2000,
                            flag: true,
                            message: '添加成功'
                        }
                    } else {
                        inf = {
                            code: 3000,
                            flag: false,
                            message: '添加失败'
                        }
                    }
                }
                console.log(inf)
            })
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: err.errno,
            flag: false,
            message: '服务器错误'
        }
        res.send(inf)
    }
})

//获取订单信息
router.get('/getorder', async (req, res) => {
    let { uid } = req.query
    // console.log(uid)
    try {
        let p = await query(`select gid,count,gsize from goodsorder where uid='${uid}'`)
        let str = ''
        // console.log(p)
        p.forEach(item => {
            str += `${item.gid},`
        })
        str = str.substr(0, str.length - 1)
        if (p.length) {
            let result = await query(`select gid,gimgs,gtitle,gprice,gsize,gxiaoliang from goodsinfo where gid in(${str})`)
            if (result) {
                result.forEach(item => {
                    item.gimgs = JSON.parse(item.gimgs).length == 1 ? JSON.parse(item.gimgs)[0] : JSON.parse(item.gimgs)[1]
                })
                p.forEach(item1 => {
                    result.forEach(item2 => {
                        if (item1.gid == item2.gid) {
                            item1.gsize = JSON.parse(item2.gsize)[item1.gsize]
                            item1.gimgs = item2.gimgs
                            item1.gtitle = item2.gtitle
                            item1.gprice = item2.gprice
                            item1.gxiaoliang = item2.gxiaoliang
                        }
                    })
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
                    message: '获取失败',
                    data: result
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
            message: '服务器错误'
        }
        res.send(inf)
    }
})

//取消订单
router.delete('/delorder',async(req,res)=>{
    let {uid,gid,gsize} = req.body
    console.log(uid,gid,gsize)
    let inf
    try{
        let p = await query(`delete from goodsorder where uid='${uid}' and gid='${gid}' and gsize='${gsize}'`)
        if(p.affectedRows){
            inf = {
                code:2000,
                flag:true,
                message:'取消成功'
            }
        }else{
            inf = {
                code:3000,
                flag:false,
                message:'取消失败'
            }
        }
        res.send(inf)
    }catch(err){
        inf = {
            code:err.errno,
            flag:false,
            message:'服务器错误'
        }
        res.send(inf)
    }
})
module.exports = router