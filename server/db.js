/* eslint-disable semi,spaced-comment,key-spacing,comma-spacing */
// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/byc'); // 地址跟第一步的地址对应。
//
// // 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));

/************** 定义模型Model **************/
// demo-------------------------------------------------------------------------------------
const insertSchema = mongoose.Schema({
  name : String,
  age : String
});
// demo-------------------------------------------------------------------------------------
/************** 定义模型注册模型 **************/
const registSchema = mongoose.Schema({
  email : String,
  pwd : String,
  name: String,
  realName: String,
  phone: String
});

const Models = {
  Insert : mongoose.model('Login',insertSchema),
  Regist : mongoose.model('Regist', registSchema)
}
module.exports = Models;
