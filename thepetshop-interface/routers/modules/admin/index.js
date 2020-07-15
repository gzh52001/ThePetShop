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
        let sql = `SELECT * FROM admin WHERE USERNAME='${name}'`
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
//注册
router.post('/reg', async (req, res) => {
    let { username, password } = req.body
    let miwen = bcryptjs.hashSync(password)
    console.log(miwen)
    try {
        let sql = `insert into admin(username,password) values('${username}','${miwen}')`
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
//登录
router.post('/login', async (req, res) => {
    let { username, password, keep } = req.body
    try {
        let sql = `select * from admin where username='${username}'`
        let p = await query(sql)
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

module.exports = router