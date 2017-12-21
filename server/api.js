/* eslint-disable spaced-comment,handle-callback-err */
'use strict'
const models = require('./db')
//引入db里头定义的数据库模型
const express = require('express')
const router = express.Router()
//创建express的路由功能，可以根据需要创建多个路由，需要多少，创建多少。
const mongoose = require('mongoose')
const db = mongoose.connection
const crypto = require('crypto')
// demo-------------------------------------------------------------------------------------
router.get('/api/login/createAccount', (req, res) => {
  //路由，类似于java中的拦截器功能，在请求到达后台之前，先在这里处理。
  var collection = db.collection('test')
  //连接数据库里头的test表
  let newAccount = new models.Insert({
    name: req.query.name,
    age: req.query.age
  })
  //按照在db里头定义的模型插入数据
  collection.insert(newAccount, function (err, result) {
    if (err) {
      res.send('fail')
      return
    } else {
      res.send('success')
    }
  })
  //在test表里头插入数据并且保存,如果成功了前端返回的数据是success,如果失败返回数据fail
})
// demo-------------------------------------------------------------------------------------
router.post(('/api/home'), (req, res) => {
  var sess = req.session
  if (sess.loginUser) {
    var loginUser = sess.loginUser
    var isLogined = !!loginUser
    res.send({login: isLogined, code: '000', user: loginUser.name})
  } else {
    res.send({msg: '该用户未登录'})
  }
})
router.post(('/api/adminHome'), (req, res) => {
  var sess = req.session
  if (sess.adminUser) {
    var adminUser = sess.adminUser
    var isLogined = !!adminUser
    res.send({login: isLogined, code: '000', user: adminUser.name})
  } else {
    res.send({msg: '该用户未登录'})
  }
})
router.post('/api/login/regist', (req, res) => {
  var collection = db.collection('users')
  let content = req.body.pwd //加密的明文；
  let md5 = crypto.createHash('md5')
  md5.update(content)
  let mdPwd = md5.digest('hex')
  let newAccount = new models.Regist({
    name: req.body.name,
    email: req.body.email,
    pwd: mdPwd,
    realName: req.body.realName,
    phone: req.body.phone
  })
  var whereStr = {'email': newAccount.email}
  collection.find(whereStr, function (error, cursor) {
    cursor.each(function (error, doc) {
      if (doc && doc.email) {
        res.json({msg: '注册邮箱不能重复', code: '300'})//返回json格式的数据
        return false //用each循环的时候必须得写这行代码,不然服务器端会发生错误
      } else {
        if (newAccount.name && newAccount.email && newAccount.pwd && newAccount.realName && newAccount.phone) {
          collection.insert(newAccount, function (err, result) {
            if (err) {
              // res.json({err, message: '注册失败'})
              res.json({msg: '注册失败', code: '111'})
            } else {
              // res.json({result, message: '注册成功'})
              res.json({msg: '注册成功', code: '000'})
            }
          })
        } else {
          res.json({msg: '请输入正确的信息'})
        }
      }
    })
  })
})
router.post('/api/login/login', (req, res) => {
  var collection = db.collection('users')
  let content = req.body.pwd//加密的明文；
  let md5 = crypto.createHash('md5')
  md5.update(content)
  let mdPwd = md5.digest('hex')
  var whereStr = {'email': req.body.email, 'pwd': mdPwd}
  collection.find(whereStr, function (error, cursor) {
    cursor.each(function (error, doc) {
      if (doc) {
        req.session.regenerate(function (err) {
          if (err) {
            return res.json({code: '222', msg: '登录失败'})
          }
          req.session.loginUser = doc
          res.json({code: '000', msg: '登录成功', userId: doc._id})
          return false
        })
        return false
      } else {
        res.json({msg: '账号或密码错误', code: '111'})
      }
    })
  })
})
router.post('/api/login/adminLogin', (req, res) => {
  var collection = db.collection('admin')
  var whereStr = {'email': req.body.email, 'pwd': req.body.pwd}
  collection.find(whereStr, function (error, cursor) {
    cursor.each(function (error, doc) {
      if (doc) {
        console.log('============doc', doc)
        req.session.regenerate(function (err) {
          if (err) {
            return res.json({code: '222', msg: '登录失败'})
          }
          req.session.adminUser = doc
          res.json({code: '000', msg: '登录成功', userId: doc._id})
          return false
        })
        return false
      } else {
        res.json({msg: '账号或密码错误', code: '111'})
      }
    })
  })
})
router.post('/api/login/logout', (req, res) => {
  const sess = req.session
  sess.loginUser = null
  res.json({code: '000', msg: '登出成功'})
})
module.exports = router
// 主要是处理db跟后端接口
//在这个文件里console数据都会在控制台显示/server =>node index.js  nodejs控制台testing=>npm run dev

// 全局拦截器:interceptors,全部请求发送之前的统一处理,全部请求发送后的统一处理,show,loading之类的处理
