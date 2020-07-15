let jwt = require('jsonwebtoken');

let secret = "guofu"
function create(data,expiresIn = 60 * 60 * 24 *7){
    //data:需要加密的数据
    //expiresIn:失效时间，s为单位 60 * 60 * 24 *7 = 7天
    let token = jwt.sign({data},secret,{expiresIn})
    return token
}

// let psw = create('123123')
// console.log(psw)

function verify(token){
    let res;
    try{
        let result = jwt.verify(token,secret);
        res = true
    }catch(err){
        res = false
    }
    return res
}

// let p = verify(psw)
// console.log(p)

module.exports = {
    create,
    verify
}

