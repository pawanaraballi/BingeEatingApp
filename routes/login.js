
var jwt = require('jsonwebtoken');
var express = require('express');
var bcrypt = require('bcrypt');
var saltRounds = 5;
console.log('admin.js');
var login = express.Router();
var mysql = require('../models/mysql');

login.get('/', function (req, res,next) {

    console.log(req.session);

    var user = req.query.username;
    var password = req.query.password;

    console.log(user);
    if(user == null || password == null){
        res.render('pages/login',{statusCode : 200 , message : "" , error: null});
    }else{
        mysql.getLoginDetails(user,function(model) {
            if(model ==  null){
                console.log("no data");
                res.render('pages/login',{statusCode : 200 , message : "invalid credentials" , error: "invalid credentials"});

            }else{
                console.log(model.get('password'));
                console.log(password);
                console.log(model.get('tag'));
                if( bcrypt.compareSync(password, model.get('password'))){
                var token = jwt.sign({ user: user , tag :model.get('tag') }, 'test' ,  {expiresIn:'1800000', jwtid: 'jwtid' });
                req.session.token = token;
                    if(model.get('tag') == 'user'){
                        res.json({statusCode: 200, message : " login Successful ", token: token});
                    }else  if(model.get('tag') == 'admin'){
                        res.redirect('/admin/home');
                    } else  if(model.get('tag') == 'supporter'){
                        res.redirect('/supporter/home');
                    }

                }
                else{
                    res.render('pages/login',{statusCode : 200 , message : "invalid credentials" , error: "invalid credentials"});

                }
            }
        })

    }
});

module.exports = login;