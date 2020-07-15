const express = require('express')
const bodyParser = require('body-parser')

const query = require("../../db/mysql")
const { create, verify } = require("../token")
const bcryptjs = require("bcryptjs");

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
//验证用户名
router.get('/checkName', async (req, res) => {
    let { name } = req.query
    try {
        let sql = `SELECT * FROM user WHERE NAME='${name}'`
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
            message: "服务器错误"
        }
        res.send(inf)
    }
})
//注册
router.post('/reg', async (req, res) => {
    let { username, password } = req.body
    let miwen = bcryptjs.hashSync(password)
    console.log(miwen)
    try {
        let sql = `insert into user(username,password) values('${username}','${miwen}')`
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
            message: "服务器出错"
        }
        res.send(inf)
    }
})
//登录
router.post('/login', async (req, res) => {
    let { username, password, keep } = req.body
    try {
        let sql = `select * from user where username='${username}'`
        let p = await query(sql)
        console.log(p)
        let inf = {}
        if (p.length) {
            let miwen = p[0].password
            let result = bcryptjs.compareSync(password, miwen);
            if (result) {
                let token = ""
                if (keep == "true") {
                    token = create(password)
                }
                inf = {
                    code: 2000,
                    flag: true,
                    message: "登录成功",
                    data: {
                        token
                    }
                }
            }else{
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
//验证token
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
// 修改用户信息
router.put('/edit/:id', async (req, res) => {
    let obj = req.body;
    let str = ''
    for (let key in obj) {
        str += key + '=' + `'${obj[key]}'` + ','
    }
    str = str.slice(0, -1)
    let id = req.params.id
    try {
        let sql = `update user set ${str} where id='${id}'`
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
// 删除用户
router.delete('/del/:id', async (req, res) => {
    let id = req.params.id
    try {
        let sql = `delete from user where id='${id}'`
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
//删除多个用户
router.delete('/delAll', async (req, res) => {
    let ids = req.body.ids
    try {
        let sql = `delete from user where id in(${ids})`
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
//分页查询用户列表  分页查询 page：1 页码  size：5
router.get('/userlist', async (req, res) => {
    let { page, size } = req.query
    page = page || 1
    size = size || 5

    // select * from user limit 0,5  0-起始下标  5-5条数据
    let index = (page - 1) * 5

    try {
        let sql = `select * from user limit ${index},${size}`
        let p = await query(sql)
        let sql2 = `select * from user`
        let arr = await query(sql2)
        let inf = {}
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: "查询成功",
                total: arr.length,
                page,
                size,
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
//查询用户信息
router.get("/user/:id", async (req, res) => {
    let id = req.params.id
    try {
        let sql = `select * from user where id='${id}'`
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
            message: "查询失败"
        }
        res.send(inf)
    }
})
//多用户多商铺购物车
router.get('/cart', async (req, res) => {

})


module.exports = router