// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db =cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

   return  db.collection('pointsList')
   .orderBy("averagescore", "desc")
   .get({
       success: (res) => {
         return res
         console.log(res)
       },
       fail:(res)=>{
         return res
       }
     })
 }
