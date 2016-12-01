/* 
----------------------------------------------------------------	
Author: Pawan Araballi  
----------------------------------------------------------------
*/

var express = require('express');
console.log('questions.js');
var questions = express.Router();
var mysql = require('../models/mysql');
var verify_token = require('../models/verify');

questions.get('/DailyQuestions', function (req, res,next) {
console.log('questions');


    verify_token.verify(req.query.token,function(err, decoded) {

        if(!err && decoded.tag == 'user') {
            mysql.DailyQuestions( function(model) {
                console.log(model);
                res.json({statusCode: 200, message : "Daily Questions", data: model});
            });
        }
        else{
            console.log(err);
            res.json({statusCode: 200, message : " invalid user ", data: null});
        }
    });


});

questions.get('/WeeklyQuestions', function (req, res,next) {
    console.log('questions');


    verify_token.verify(req.query.token,function(err, decoded) {

        if(!err && decoded.tag == 'user') {
            mysql.WeeklyQuestions( function(model) {
                console.log(model);
                res.json({statusCode: 200, message : "Weekly Questions", data: model});
            });
        }
        else{
            console.log(err);
            res.json({statusCode: 200, message : " invalid user ", data: null});
        }
    });

});

questions.get('/Appointments', function (req, res,next) {
   verify_token.verify(req.query.token,function(err, decoded) {

        if(!err && decoded.tag == 'user') {
            user = decoded.user;
            mysql.getAppointment( user,  function(model) {
                console.log(model);
                res.json({statusCode: 200, message : "Appointments", data: model});
            });
        }
        else{
            console.log(err);
            res.json({statusCode: 200, message : " invalid user ", data: null});
        }
    });

});

questions.post('/DailyLog', function (req, res,next) {
    console.log('Daily Response');



    verify_token.verify( req.get('token'), function (err, decoded) {

        if (!err && decoded.tag == 'user') {
            var data = req.body;
            data.username = decoded.user;
            mysql.putUserDailyLog(data,function (model) {
                if(model == null){
                    res.json({statusCode : 200 , message:"data not stored"})
                }else{
                    res.json({statusCode : 200 , message:"data stored"})
                }
            })

        }
        else {
            console.log(err);
            res.json({statusCode: 200, message: " invalid user ", data: null});
        }
    });
});

questions.post('/DailyActivities', function (req, res,next) {
    console.log('Daily Response');



    verify_token.verify( req.get('token'), function (err, decoded) {

        if (!err && decoded.tag == 'user') {
            var data = req.body;
            data.username = decoded.user;
            mysql.putUserDailyActivities(data,function (model) {
                if(model == null){
                    res.json({statusCode : 200 , message:"data not stored"})
                }else{
                    res.json({statusCode : 200 , message:"data stored"})
                }
            })

        }
        else {
            console.log(err);
            res.json({statusCode: 200, message: " invalid user ", data: null});
        }
    });
});


questions.post('/WeeklyResponse', function (req, res,next) {
    console.log('Weekly Response');



    verify_token.verify( req.get('token'), function (err, decoded) {

        if (!err && decoded.tag == 'user') {
            var data = req.body;
            data.username = decoded.user;
            mysql.putUserWeeklyLog(data,function (model) {
                if(model == null){
                    res.json({statusCode : 200 , message:"data not stored"})
                }else{
                    res.json({statusCode : 200 , message:"data stored"})
                }
            })

        }
        else {
            console.log(err);
            res.json({statusCode: 200, message: " invalid user ", data: null});
        }
    });
});

module.exports = questions;