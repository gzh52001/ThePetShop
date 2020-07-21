const express = require('express')

const query = require("../../db/mysql")
const { create, verify } = require("../token")
const bcryptjs = require("bcryptjs");

const router = express.Router()

//管理员验证用户名
router.get('/checkName', async (req, res) => {
    let { username } = req.query
    try {
        let sql = `SELECT * FROM admin WHERE USERNAME='${username}'`
        let p = await query(sql)
        let inf = {};
        if (p.length) {
            inf = {
                code: 3000,
                flag: false,
                message: "用户名已存在,不能注册",
            }
        } else {
            inf = {
                code: 2000,
                flag: true,
                message: "用户名不存在,可以注册"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: "查询失败"
        }
        res.send(inf)
    }
})
//管理员注册
router.post('/reg', async (req, res) => {
    let { username, password } = req.body
    let miwen = bcryptjs.hashSync(password)
    // console.log(miwen)
    let myname = Math.floor(Math.random() * 2) % 2 == 0 ? '梅小鸡' : '梅没鸡'
    let grade = 0
    try {
        let sql = `insert into admin(myname,username,password,grade) values('${myname}','${username}','${miwen}','${grade}')`
        let p = await query(sql)
        let inf = {}
        if (p.affectedRows) {//受影响多少行 >0 就是成功
            inf = {
                code: 2000,
                flag: true,
                message: "注册成功"
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: "注册失败"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: "服务器错误"
        }
        res.send(inf)
    }
})
//管理员登录
router.post('/login', async (req, res) => {
    let { username, password, keep } = req.body
    // console.log(username, password, keep)
    try {
        let sql = `select * from admin where username='${username}'`
        let p = await query(sql)
        let inf = {}
        if (p.length) {
            let miwen = p[0].password
            let result = bcryptjs.compareSync(password, miwen);
            if (result) {
                let token = ""
                if (keep) {
                    token = create(password)
                } else {
                    token = create(password, 60 * 60 * 24)
                }
                let aid = p[0].aid
                let myname = p[0].myname
                let grade = p[0].grade
                inf = {
                    code: 2000,
                    flag: true,
                    message: "登录成功",
                    data: {
                        aid,
                        myname,
                        username,
                        grade,
                        token
                    }
                }
            } else {
                inf = {
                    code: 3000,
                    flag: false,
                    message: "登录失败"
                }
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: "用户名不存在"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '服务器出错'
        }
        res.send(inf)
    }
})
//管理员验证token
router.get('/verify', (req, res) => {
    let { token } = req.query
    let result = verify(token)
    let inf = {}
    if (result) {
        inf = {
            code: 2000,
            flag: true,
            message: "校验成功"
        }
    } else {
        inf = {
            code: 3000,
            flag: false,
            message: "检验失败"
        }
    }
    res.send(inf)
})
//修改用户信息
router.put('/edituser', async (req, res) => {
    let { uid, msg } = req.body;
    // console.log(req.body)
    // msg = JSON.parse(msg)
    let str = ''
    for (let key in msg) {
        str += key + '=' + `'${msg[key]}'` + ','
    }
    str = str.slice(0, -1)
    try {
        let sql = `update user set ${str} where uid='${uid}'`
        let p = await query(sql);
        let inf = {}
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
                message: "修改失败"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: "服务器出错"
        }
        res.send(inf)
    }
})
//删除用户
router.delete('/deluser', async (req, res) => {
    let uid = req.body.uid
    try {
        let sql = `delete from user where uid='${uid}'`
        let p = await query(sql);
        let inf = {}
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
                message: "删除失败"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: "删除失败"
        }
        res.send(inf)
    }
})
//批量删除用户
router.delete('/delpartuser', async (req, res) => {
    let uids = req.body.uids
    let str = ''
    uids.forEach(item => {
        str += item + ','
    })
    str = str.substr(0, str.length - 1)
    try {
        let sql = `delete from user where uid in(${str})`
        let p = await query(sql);
        let inf = {}
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
                message: "删除失败"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: "删除失败"
        }
        res.send(inf)
    }
})
//分页排序显示用户列表  分页查询 page：1 页码  num：5
router.get('/userlist', async (req, res) => {
    let { sort, page, num } = req.query
    sort = sort || 0
    page = page || 1
    num = num || 8
    // select * from user limit 0,5  0-起始下标  5-5条数据
    let index = (page - 1) * num
    let sql
    if (sort == 0) {
        sql = `select uid,username,phonenum,email,time from user order by uid limit ${index},${num}`
    } else if (sort == 1) {
        sql = `select uid,username,phonenum,email,time from user order by uid desc limit ${index},${num}`
    }
    try {
        let p = await query(sql)
        let sql2 = `select * from user`
        let arr = await query(sql2)
        let inf = {}
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: "查询成功",
                total: arr.length - 0,
                page: page - 0,
                num: num - 0,
                data: p
            }
            res.send(inf)
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: "查询失败"
            }
            res.send(inf)
        }
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: true,
            message: "查询失败"
        }
        res.send(inf)
    }
})
//查询用户详细信息
router.get("/userinfo", async (req, res) => {
    let uid = req.query.uid
    try {
        let sql = `select * from user where uid='${uid}'`
        let p = await query(sql);
        let inf = {};
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: "查询成功",
                data: p
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: "查询失败"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: errno,
            flag: false,
            message: "服务器错误"
        }
        res.send(inf)
    }
})
//模糊搜索用户
router.get("/searchuser", async (req, res) => {
    let { type, value } = req.query
    let inf
    try {
        let sql = `select uid,username,phonenum,email,time from user where ${type} like '%${value}%'`
        let p = await query(sql)
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: "查询成功",
                data: p
            }
        } else {
            inf = {
                code: 3000,
                flag: true,
                message: "查询失败"
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: 3000,
            flag: false,
            message: "服务器错误"
        }
        res.send(inf)
    }
})
//修改昵称
router.put('/changeName', async (req, res) => {
    let { aid, myname } = req.body
    console.log(myname)
    let inf
    try {
        let p = await query(`update admin set myname='${myname}' where aid='${aid}'`)
        if (p.affectedRows) {
            inf = {
                code: 2000,
                flag: true,
                message: "修改成功"
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: "修改失败"
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: err.errno,
            flag: false,
            message: "服务器错误"
        }
        res.send(inf)
    }
})
//删除商品
router.delete('/delgoods', async (req, res) => {
    let gid = req.body.gid
    try {
        let sql = `delete from goodsinfo where gid='${gid}'`
        let p = await query(sql);
        let inf = {}
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
                message: "删除失败"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: "删除失败"
        }
        res.send(inf)
    }
})
//批量删除商品
router.delete('/delpartgoods', async (req, res) => {
    let gids = req.body.gids
    let str = ''
    gids.forEach(item => {
        str += item + ','
    })
    str = str.substr(0, str.length - 1)
    try {
        let sql = `delete from goodsinfo where gid in(${str})`
        let p = await query(sql);
        let inf = {}
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
                message: "删除失败"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: "删除失败"
        }
        res.send(inf)
    }
})
//模糊搜索商品 不限字段名 换页
router.get("/searchgoods", async (req, res) => {
    let { type,value,page,num} = req.query
    page = page || 1 
    num = num || 8
    index = (page-1)*num
    let inf
    try {
        let sql1 = `select gid,gimgs,gtitle,gprice,gxiaoliang from goodsinfo where ${type} like '%${value}%'`
        let p1 = await query(sql1)
        let sql2 = `select gid,gimgs,gtitle,gprice,gxiaoliang from goodsinfo where ${type} like '%${value}%' limit ${index},${num}`
        let p2 = await query(sql2)
        if (p2.length) {
            let total = p1.length
            p2.forEach(item => {
                item.gimgs = JSON.parse(item.gimgs).length == 1 ? JSON.parse(item.gimgs)[0] : JSON.parse(item.gimgs)[1]
            })
            inf = {
                code: 2000,
                flag: true,
                message: "查询成功",
                data: {
                    total,
                    p2   
                }
            }
        } else {
            inf = {
                code: 3000,
                flag: true,
                message: "查询失败"
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: 3000,
            flag: false,
            message: "服务器错误"
        }
        res.send(inf)
    }
})
//添加商品(**************************88888)
router.put("/addgoods",async(req,res)=>{
    let {gtitle,gdesc,gbrandtitle,tid,gprice,gsize,stock,gimgs} = req.body
    gimgs = gimgs || "['https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4226027127,4128085106&fm=26&gp=0.jpg','https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2081481430,3027122704&fm=26&gp=0.jpg']"
    console.log(gtitle,gdesc,gbrandtitle,tid,gprice,gsize,stock,gimgs)
    let inf
    try{
        let sql = `insert goodsinfo(gtitle,gdesc,gbrandtitle,tid,gprice,gsize,stock,gimgs) values('${gtitle}','${gdesc}','${gbrandtitle}','${tid}','${gprice}','${gsize}','${stock}','${gimgs}')`
        let p = await query(sql)
        console.log(p)
        if(p.affectedRows){
            inf = {
                code:2000,
                flag:true,
                message:"添加成功"
            }
        }else{
            inf = {
                code:3000,
                flag:false,
                message:"添加失败"
            }
        }
        res.send(inf)
    }catch(err){
        inf = {
            code:err.errno,
            flag:false,
            message:"服务器错误"
        }
        res.send(inf)
    }

})
//修改商品信息
router.put("/editgoods",async(req,res)=>{
    let {gid,gtitle,gdesc,gbrandtitle,tid,gprice,gsize,stock,gimgs} = req.body
    gimgs = gimgs || ['https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4226027127,4128085106&fm=26&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2081481430,3027122704&fm=26&gp=0.jpg']
    let inf
    try{
        let sql = `update goodsinfo set gtitle='${gtitle}',gdesc='${gdesc}',gbrandtitle='${gbrandtitle}',tid='${tid}',gprice='${gprice}',gsize='${gsize}',stock='${stock}',gimgs='${gimgs}' where gid='${gid}'`
        let p = await query(sql)
        if(p.affectedRows){
            inf = {
                code:2000,
                flag:true,
                message:"修改成功"
            }
        }else{
            inf = {
                code:3000,
                flag:false,
                message:"修改失败"
            }
        }
    }catch(err){
        inf = {
            code:err.errno,
            flag:false,
            message:"服务器错误"
        }
        res.send(inf)
    }
})
//获取所有订单列表
router.get('/getallorder', async (req, res) => {
    let { sort, page, num ,isDeliver} = req.query
    console.log(sort,page,num,isDeliver)
    page = page || 1
    num = num || 8
    sort = sort || 1
    let index = (page - 1) * num
    let inf
    let sql
    if (sort == 0) {
        if(isDeliver == 0){
            sql = `select uid,gid,count,gsize,otime,deliver from goodsorder where deliver='0' order by otime limit ${index},${num}`
        }else if(isDeliver == 1){
            sql = `select uid,gid,count,gsize,otime,deliver from goodsorder where deliver='1' order by otime limit ${index},${num}`
        }else{
            sql = `select uid,gid,count,gsize,otime,deliver from goodsorder order by otime limit ${index},${num}`
        }
    } else {
        if(isDeliver == 0){
            sql = `select uid,gid,count,gsize,otime,deliver from goodsorder where deliver='0' order by otime desc limit ${index},${num}`
        }else if(isDeliver == 1){
            sql = `select uid,gid,count,gsize,otime,deliver from goodsorder where deliver='1' order by otime desc limit ${index},${num}`
        }else{
            sql = `select uid,gid,count,gsize,otime,deliver from goodsorder order by otime desc limit ${index},${num}`
        }
    }
    try {
        console.log(sql)
        let p = await query(sql)
        let str = ''
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
                let plength = await query(`select uid,gid,count,gsize,otime from goodsorder`)
                let total = plength.length
                inf = {
                    code: 2000,
                    flag: true,
                    message: '获取成功',
                    data: {
                        total,
                        p
                    }
                }
            } else {
                inf = {
                    code: 3000,
                    flag: false,
                    message: '获取失败'
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
//获取订单详情
router.get('/getorderinfo', async (req, res) => {
    let { uid, gid, otime } = req.query
    let inf
    try {
        let p1 = await query(`select * from goodsorder where uid='${uid}' and otime='${otime}' and gid='${gid}'`)
        if (p1.length) {
            let p2 = await query(`select tid,gid,gtitle,gimgs,gprice,gxiaoliang,gsize from goodsinfo where gid='${gid}'`)
            if (p2.length) {
                let tid = p2[0].tid
                let p3 = await query(`select goodstype from goodstype where tid='${tid}'`)
                if (p3.length) {
                    let p4 = await query(`select username,myname,phonenum,email,address from user where uid='${uid}'`)
                    console.log(p4)
                    if (p4.length) {
                        p1[0].gsize = JSON.parse(p2[0].gsize)[p1[0].gsize]
                        p1[0].gtitle = p2[0].gtitle
                        p1[0].gimgs = p2[0].gimgs = JSON.parse(p2[0].gimgs).length == 1 ? JSON.parse(p2[0].gimgs)[0] : JSON.parse(p2[0].gimgs)[1]
                        p1[0].gprice = p2[0].gprice
                        p1[0].gxiaoliang = p2[0].gxiaoliang
                        p1[0].goodstype = p3[0].goodstype
                        p1[0].myname = p4[0].myname
                        p1[0].phonenum = p4[0].phonenum
                        p1[0].email = p4[0].email
                        p1[0].address = p4[0].address
                        p1[0].username = p4[0].username
                        inf = {
                            code: 2000,
                            flag: true,
                            message: "获取成功",
                            data: p1
                        }
                    } else {
                        inf = {
                            code: 3000,
                            flag: false,
                            message: "获取失败"
                        }
                    }
                } else {
                    inf = {
                        code: 3000,
                        flag: false,
                        message: "获取失败"
                    }
                }
            } else {
                inf = {
                    code: 3000,
                    flag: false,
                    message: "获取失败"
                }
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
            message: "服务器错误"
        }
        res.send(inf)
    }
})
//批量取消订单
router.delete('/delpartorder', async (req, res) => {
    let {otime} = req.body
    let str = ""
    otime.forEach(item=>{
        str += item+','
    })
    str = str.substr(0,str.length-1)
    console.log(str)
    let inf
    try {
        let p = await query(`delete from goodsorder where otime in(${str})`)
        if(p.affectedRows){
            inf = {
                code:2000,
                flag:true,
                message:'删除成功'
            }
        }else{
            inf = {
                code:3000,
                flag:false,
                message:"删除失败"
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: err.errno,
            flag: false,
            message: "服务器错误"
        }
        res.send(inf)
    }
})
//获取管理员列表
router.get("/getadmin",async(req,res)=>{
    let inf
    try{
        let p = await query(`select * from admin`)
        if(p.length){
            inf = {
                code : 2000,
                flag:true,
                message:"获取成功",
                data:p
            }
        }else{
            inf = {
                code :3000,
                flag:false,
                message:"获取失败"
            }
        }
        res.send(inf)
    }catch(err){
        inf = {
            code:err.errno,
            flag:false,
            message:"服务器错误"
        }
        res.send(inf)
    }
})
//模糊搜索订单信息(未完成)
router.get("/searchuser", async (req, res) => {
    let { type, value } = req.query
    let inf
    try {
        let sql = `select uid,gid,otime from goodsorder where ${type} like '%${value}%'`
        let p = await query(sql)
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: "查询成功",
                data: p
            }
        } else {
            inf = {
                code: 3000,
                flag: true,
                message: "查询失败"
            }
        }
        res.send(inf)
    } catch (err) {
        inf = {
            code: err.errno,
            flag: false,
            message: "服务器错误"
        }
        res.send(inf)
    }
})
//发货
router.post('/delivergoods',async(req,res)=>{
    let {uid,gid,otime} = req.body
    let inf
    try{
        let p = await query(`update goodsorder set deliver='1' where uid='${uid}' and gid='${gid}' and otime='${otime}'`)
        if(p.affectedRows){
            inf = {
                code: 2000,
                flag: true,
                message: "发货成功"
            }
        }else{
            inf = {
                code: 3000,
                flag: false,
                message: "发货失败"
            }
        }
        res.send(inf)
    }catch(err){
        inf = {
            code: err.errno,
            flag: false,
            message: "服务器错误"
        }
        res.send(inf)
    }
})
module.exports = router