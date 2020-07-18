const mysql = require('mysql')

var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"123456",
    port:"3306",
    database:"edog",
    multipleStatements:true
})

function query(sql){
    return new Promise((resolve,reject)=>{
        pool.query(sql,(err,data)=>{
            if(err) reject(err);
            resolve(data)
        })
    })
}

module.exports = query

// let sql = "SELECT * FROM students"

// let p = query(sql);
// p.then(res=>{
//     console.log(res)
// }).catch(err=>{
//     console.log(err)
// })
// console.log(p)