

var express = require('express');
var user = express.Router();
var mysql = require('../models/mysql');
var verify_token = require('../models/verify');
var rn = require('random-number');
var i =0;

user.get('/DailyQuestions', function (req, res,next) {
console.log('DailyQuestions');


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

user.get('/WeeklyQuestions', function (req, res,next) {
    console.log('WeeklyQuestions');


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

user.get('/Steps', function (req, res,next) {
    console.log('Steps');


    verify_token.verify(req.query.token,function(err, decoded) {

        if(!err && decoded.tag == 'user') {
            mysql.getSteps( function(model) {
                console.log(model);
                res.json({statusCode: 200, message : "Steps", data: model});
            });
        }
        else{
            console.log(err);
            res.json({statusCode: 200, message : " invalid user ", data: null});
        }
    });

});

user.get('/currentStep', function (req, res,next) {
    console.log('current step');

    verify_token.verify(req.query.token,function(err, decoded) {
        if(!err && decoded.tag == 'user') {
            var username = decoded.user;
            mysql.getUser(username,function (model) {
                if(model != null){

                    res.json({statusCode: 200, message : " updated step", data:model });
                }
            });
        }
        else{
            console.log(err);
            res.json({statusCode: 200, message : " invalid user ", data: null});
        }
    });

});

user.get('/Appointments', function (req, res,next) {
   verify_token.verify(req.query.token,function(err, decoded) {

        if(!err && decoded.tag == 'user') {
            user = decoded.user;
            mysql.getAppointmentForUser( user,  function(model) {
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

user.get('/AllDailyLogs', function (req, res,next) {
    console.log('DailyQuestions');


    verify_token.verify(req.query.token,function(err, decoded) {

        if(!err && decoded.tag == 'user') {
            user = decoded.user;
            mysql.getUserDailyLog(user, function(model) {
                var data = JSON.stringify(model);
                console.log(data);
                res.json({statusCode: 200, message : "DailyLog", data: model});
            });
        }
        else{
            console.log(err);
            res.json({statusCode: 200, message : " invalid user ", data: null});
        }
    });


});

user.get('/notifications', function (req, res,next) {
    console.log('DailyQuestions');


    verify_token.verify(req.query.token,function(err, decoded) {

        if(!err && decoded.tag == 'user') {
            user = decoded.user;
            mysql.getUser(user, function(model) {
                console.log(JSON.parse(JSON.stringify(model)));
                var data = (JSON.parse(JSON.stringify(model)));
                data = data.noteData;
                res.json({statusCode: 200, message : "notifications", data: data});
            });
        }
        else{
            console.log(err);
            res.json({statusCode: 200, message : " invalid user ", data: null});
        }
    });


});



user.get('/game', function (req, res,next) {
    console.log('game');
    var tagArray = {};
    var RandaomImages = [];

    verify_token.verify(req.query.token,function(err, decoded) {

        if(!err && decoded.tag == 'user') {
            user = decoded.user;

            mysql.getAllImageData(function (model) {
                var data = JSON.parse(JSON.stringify(model));
                console.log(data);
                for(row in data){
                    if(data[row].tag == ""){
                        RandaomImages.push(data[row]);
                    }else {
                        var tag = data[row].tag;
                        console.log(tag);
                        if(tagArray[tag] == null){
                            console.log("new"+ tag);
                            tagArray[tag] = [];
                            tagArray[tag].push(data[row].ImageUrl);
                        }
                        else {
                            tagArray[tag].push(data[row].ImageUrl);
                        }
                    }

                }

                var temp_key, keys = [];
                for(temp_key in tagArray) {
                    if(tagArray.hasOwnProperty(temp_key)) {
                        keys.push(temp_key);
                    }
                }
                if(RandaomImages.length>5) {
                    // var options = {
                    //     min: 0, max: RandaomImages.length - 1, integer: true
                    // };
                    //
                    // var AnsQuestions = [];
                    // for (var i = 0; i < 6; i++) {
                    //     AnsQuestions.push(RandaomImages[rn(options)]);
                    // }

                    res.json({statusCode: 200, message: "QuestionGame", Question: tagArray, Ans: RandaomImages});
                }else {
                    console.log("entered");
                    console.log(keys[Math.floor(Math.random() * keys.length)]);
                    console.log(tagArray[keys[Math.floor(Math.random() * keys.length)]]);
                    var randomnum1 = rn({
                        min: 2, max: 5, integer: true
                    });

                    var selectData = [];
                    var rdn = keys[Math.floor(Math.random() * keys.length)];
                    console.log(randomnum1);
                    for( var i =0 ; i<randomnum1 ;i++) {
                        console.log(i + "for");
                        selectData.push(
                            {
                                key: rdn,
                                value: tagArray[rdn][Math.floor(Math.random() * tagArray[rdn].length)]
                            }
                        );
                    }
                    for( var i =randomnum1 ; i<9 ;i++){
                        console.log(i + "for 9");
                        rdn = keys[Math.floor(Math.random() * keys.length)];
                        selectData.push(
                            {
                                key: rdn,
                                value: tagArray[rdn][Math.floor(Math.random() * tagArray[rdn].length)]
                            }
                        );
                    }
                    res.json({statusCode: 200, message: "SelectGame", data: selectData});

                }
            })
        }
        else{
            console.log(err);
            res.json({statusCode: 200, message : " invalid user ", data: null});
        }
    });
});

user.post('/game', function (req, res,next) {
    console.log('Daily Response');



    verify_token.verify( req.get('token'), function (err, decoded) {

        if (!err && decoded.tag == 'user') {
            var in_data = req.body;
            user = decoded.user;
            console.log(in_data);


            mysql.getAllImageData(function (model) {
                var data = JSON.parse(JSON.stringify(model));
                console.log(data);
                for (image in in_data){
                    for (row in data) {
                        if (data[row].image == in_data[image].Image) {
                            var array;
                            if(data[row].responses ==null){
                                array = [];
                            }else{
                                array  = JSON.parse(data[row].responses);
                            }
                            array.push(in_data[image].userResponse);

                            console.log(data[row].image);
                            console.log(JSON.stringify(array));

                            mysql.updateImageData(data[row].image,JSON.stringify(array),function (model) {
                                console.log(model);


                            })

                        }
                    }
                }
                res.json({statusCode: 200, message : "DailyLog", data: "stored data"});
            })

        }
        else {
            console.log(err);
            res.json({statusCode: 200, message: " invalid user ", data: null});
        }
    });
});



user.post('/DailyLog', function (req, res,next) {
    console.log('Daily Response');

    verify_token.verify( req.get('token'), function (err, decoded) {

        if (!err && decoded.tag == 'user') {
            var data = req.body;
            data.username = decoded.user;
            var ImageData = {};
            //var array =  [];
            //ImageData.user = decoded.user;
            // array.push(data.FoodAndDrinksConsumed);
            ImageData.ImageUrl = data.ImageUrl;
            ImageData.name = data.FoodAndDrinksConsumed;
            ImageData.tag = data.FoodAndDrinksConsumed;

            mysql.putUserDailyLog(data,function (model) {
                console.log(data);
                if(model == null){
                    res.json({statusCode : 200 , message:"data not stored"});
                }else{
                    mysql.putImageData(ImageData,function (model) {
                        if(model == null){
                            res.json({statusCode : 200 , message:"Image data not stored"});
                        }else{
                            res.json({statusCode : 200 , message:"Image data stored"});
                        }
                    });

                }
            })


        }
        else {
            console.log(err);
            res.json({statusCode: 200, message: " invalid user ", data: null});
        }
    });
});





user.post('/DailyActivities', function (req, res,next) {
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


user.post('/WeeklyResponse', function (req, res,next) {
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

module.exports = user;