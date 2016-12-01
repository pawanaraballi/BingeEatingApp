
var jwt = require('jsonwebtoken');
var express = require('express');
var bcrypt = require('bcrypt');
var admin = express.Router();
var mysql = require('../models/mysql');
var verify_token = require('../models/verify');

admin.get('/home', function (req, res,next) {

    verify_token.verify(req.session.token,function(err, decoded) {

        if(!err && decoded.tag == 'admin'){
            console.log(decoded.user);
            console.log(decoded.supporter);
            user = decoded.user;
            res.render('pages/admin_dashboard');
        }else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });
});



module.exports = admin;