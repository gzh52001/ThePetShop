const express = require('express')

const query = require("../../db/mysql")
const { create, verify } = require("../token")
const bcryptjs = require("bcryptjs");

const router = express.Router()

//验证用户名
router.get('/checkname', async (req, res) => {
    let { username } = req.query
    try {
        let sql = `SELECT * FROM user WHERE username='${username}'`
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
    let { username, password,phonenum,email } = req.body
    console.log(username, password,phonenum,email)
    let miwen = bcryptjs.hashSync(password)
    let time = Date.now()
    let userface = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3956916030,3079747949&fm=26&gp=0.jpg'
    try {
        let sql = `insert into user(username,password,userface,time,phonenum,email) values('${username}','${miwen}','${userface}','${time}','${phonenum}','${email}')`
        let p = await query(sql)
        let inf = {}
        console.log(p)
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
        let inf = {}
        if (p.length) {
            let miwen = p[0].password
            let result = bcryptjs.compareSync(password, miwen);
            if (result) {
                let token = ""
                if (keep) {
                    token = create(password)
                }
                let uid = p[0].uid
                let userface = p[0].userface
                let phonenum = p[0].phonenum
                let email = p[0].email
                inf = {
                    code: 2000,
                    flag: true,
                    message: "登录成功",
                    data: {
                        uid,
                        username,
                        userface,
                        phonenum,
                        email,
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

module.exports = router