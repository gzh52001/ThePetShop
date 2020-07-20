const express = require('express')
const query = require("../../db/mysql")
const { create, verify } = require("../token")
const bcryptjs = require("bcryptjs");
const svgCaptcha = require("svg-captcha")

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
//用户注册
router.post('/reg', async (req, res) => {
    let { username, password, phonenum, email } = req.body
    let miwen = bcryptjs.hashSync(password)
    let time = Date.now()
    time = time - 0
    let userface = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595101392038&di=bdf3a0304aed91d44d5ef019a0344bac&imgtype=0&src=http%3A%2F%2Fy.zdmimg.com%2F202007%2F04%2F5f007d903a9766985.jpg_d250.jpg'
    let myname = Math.floor(Math.random()*2)%2==0?'梅小鸡':'梅没鸡'
    try {
        let sql = `insert into user(myname,username,password,userface,time,phonenum,email) values('${myname}','${username}','${miwen}','${userface}','${time}','${phonenum}','${email}')`
        let p = await query(sql)
        let inf = {}
        // console.log(p)
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
//用户登录
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
                }else{
                    token = create(password,60*60*24)
                }
                let uid = p[0].uid
                let userface = p[0].userface
                let phonenum = p[0].phonenum
                let email = p[0].email
                let address = p[0].address
                let myname = p[0].myname
                inf = {
                    code: 2000,
                    flag: true,
                    message: "登录成功",
                    data: {
                        uid,
                        myname,
                        username,
                        userface,
                        phonenum,
                        email,
                        address,
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
//用户验证token
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
// 修改用户密码
router.put('/editpsw', async (req, res) => {
    let { uid, oldpsw, newpsw } = req.body;
    let inf = {}
    try {
        let sql1 = `select password from user where uid=${uid}`
        let oldmiwen = await query(sql1)
        if (oldmiwen.length) {
            let result = bcryptjs.compareSync(oldpsw, oldmiwen[0].password);
            if (result) {
                let newmiwen = bcryptjs.hashSync(newpsw)
                let str = `password='${newmiwen}'`
                console.log(str)
                let sql2 = `update user set ${str} where uid='${uid}'`
                let p = await query(sql2);
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
            }else{
                inf = {
                    code: 3000,
                    flag: false,
                    message: "原密码不正确"
                }
            }
        }else{
            inf = {
                code: 3000,
                flag: false,
                message: "用户不存在"
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
//修改用户信息
router.put('/edituser',async(req,res)=>{
    let {uid,key,value} = req.body
    // console.log(uid,key,value)
    let inf
    try{
        let p = await query(`update user set ${key}='${value}' where uid='${uid}'`)
        if(p.affectedRows){
            inf={
                code:2000,
                flag:true,
                message:'修改成功'
            }
        }else{
            inf={
                code:3000,
                flag:false,
                message:'修改失败'
            }
        }
        res.send(inf)
    }catch(err){
        inf={
            code:3000,
            flag:false,
            message:'服务器错误'
        }
        res.send(inf)
    }
})
//验证码
router.get('/getcaptcha',async(req,res)=>{
    let inf
    let color="#"
    for(let i = 0 ;i < 6 ; i++){
        color += Math.floor(Math.random()*16).toString(16)
    }
    const captcha = svgCaptcha.create({noise:5,background:color,size:4})
    // console.log(captcha)
    if(typeof captcha == "object"){
        // req.session.code = captcha.text
        // console.log(req.session.code)
        inf = {
            code:2000,
            flag:true,
            message:"获取成功",
            data:{
                svg:captcha.data,
                text:captcha.text
            }
        }
    }else{
        inf = {
            code:3000,
            flag:false,
            message:"获取失败"
        }
    }
    res.send(inf)
})
module.exports = router