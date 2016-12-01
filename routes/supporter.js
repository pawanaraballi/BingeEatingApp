
var jwt = require('jsonwebtoken');
var express = require('express');
var bcrypt = require('bcrypt');
var supporter = express.Router();
var mysql = require('../models/mysql');
var verify_token = require('../models/verify');

supporter.get('/home', function (req, res,next) {

    verify_token.verify(req.session.token,function(err, decoded) {

        console.log(decoded);
        if(!err && decoded.tag == 'supporter'){
            console.log(decoded.user);
            user = decoded.user;
            mysql.getUserForSupporter(user,function (model) {
                console.log(model);
                var data = JSON.stringify(model);
                res.render('pages/details',{data:data});
            });
        }else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });
});


supporter.get('/progress', function (req, res,next) {

    verify_token.verify(req.session.token,function(err, decoded) {

        if(!err && decoded.tag == 'supporter'){
            console.log(decoded.user);
            supporter = decoded.user;
            user = req.query.username;

            mysql.getUserWeeklyLog(user,function (model) {
                if(model != null){
                    console.log( JSON.stringify(model));
                    var WeeklyLog = JSON.stringify(model);
                }
                mysql.getUserDailyActivities(user,function (model) {
                    if(model != null){
                        console.log( JSON.stringify(model));
                        var DailyActivities = JSON.stringify(model);
                    }
                    mysql.getUserDailyLog(user,function (model) {
                        if(model != null){
                            console.log( JSON.stringify(model));
                            var DailyLog = JSON.stringify(model);
                        }
                        mysql.getUser(user,function (model) {
                            if(model != null){
                                console.log( JSON.stringify(model));
                                var UserDetails = JSON.stringify(model);
                                res.render('pages/userscreen',{data:{WeeklyLog: WeeklyLog , DailyActivities :DailyActivities,DailyLog:DailyLog,UserDetails:UserDetails }})
                            }
                        });
                    });
                });
            });
        }else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });
});

supporter.get('/appointments', function (req, res,next) {

    verify_token.verify(req.session.token,function(err, decoded) {

        console.log(decoded);
        if(!err && decoded.tag == 'supporter'){
            console.log('user = ' + decoded.user);
            user = decoded.user;
            mysql.getAppointmentForSupporter(user,function (model) {
                console.log(model);
                var data = JSON.stringify(model);
                console.log('data = ' + data);
                res.render('pages/app_list',{data:data});
            });
        }else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });
});

supporter.get('/removeEvent', function (req, res,next) {

    verify_token.verify(req.session.token,function(err, decoded) {

        console.log(decoded);
        if(!err && decoded.tag == 'supporter'){
            console.log('user = ' + decoded.user);
            user = decoded.user;
        }else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });
});

supporter.get('/CreateAppointments', function (req, res,next) {

    verify_token.verify(req.session.token,function(err, decoded) {

        console.log(decoded);
        if(!err && decoded.tag == 'supporter'){
            res.render('pages/app_list',{data : {user: req.query.username}});
        }
        else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });
});

supporter.post('/CreateAppointments', function (req, res,next) {

    verify_token.verify(req.session.token,function(err, decoded) {

        if(!err && decoded.tag == 'supporter'){

            supporter = decoded.user;
            var data  = {
                Time : req.body.date + " " + req.body.time,
                supporter : supporter,
                username : req.body.user
            };

            console.log(data);
            mysql.putAppointment(data , function (model) {
                if(model != null){
                    res.redirect('/supporter/home');
                }else{
                    res.render('pages/appointments');
                }
            })
        }else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });
});


module.exports = supporter;