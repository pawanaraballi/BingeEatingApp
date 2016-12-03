var bcrypt = require('bcrypt');
var mysql = require('mysql');
var saltRounds = 5;
var knex = require('knex')({
    client:'mysql',
    connection: {
        host : 'mydbase.cwgnanpueibv.us-east-1.rds.amazonaws.com',
        user : 'indra',
        password : 'qqqqqqqq',
        port : '3306',
        database: "BingeEating"
    }
});

var bookshelf = require('bookshelf')(knex);

var DailyQuestion = bookshelf.Model.extend({
    tableName: 'DailyQuestion'
});
var WeeklyQuestion = bookshelf.Model.extend({
    tableName: 'WeeklyQuestion'
});
var DailyLog = bookshelf.Model.extend({
    tableName: 'DailyLog'
});
var DailyPhysicalActivity = bookshelf.Model.extend({
    tableName: 'DailyPhysicalActivity'
});
var WeeklySummarySheet = bookshelf.Model.extend({
    tableName: 'WeeklySummarySheet'
});
var Steps = bookshelf.Model.extend({

    tableName: 'CheckList'

});

var Admin = bookshelf.Model.extend({
    tableName: 'Admin'
});
var Supporter = bookshelf.Model.extend({
    tableName: 'Supporter'
});
var User = bookshelf.Model.extend({
    tableName: 'User'
});
var Login = bookshelf.Model.extend({
    tableName: 'Login'
});
var Appointment = bookshelf.Model.extend({
    tableName: 'appointment'
});

module.exports.DailyQuestions = function(callback) {
    new DailyQuestion()
        .fetchAll()
        .then(callback);
}

module.exports.WeeklyQuestions = function(callback) {
    new WeeklyQuestion()
        .fetchAll()
        .then(callback);
}

module.exports.getLoginDetails = function(user,callback) {
    console.log(user);
    new Login({username: user })
        .fetch()
        .then(callback);
}
module.exports.putLoginDetails = function(data,callback) {
    data.password = bcrypt.hashSync(data.password, saltRounds);
    console.log(data);
    new Login(data).save()
        .then(callback);
}


module.exports.getAdmin = function(user,callback) {
    new Admin({email: user })
        .fetch()
        .then(callback);
}

module.exports.getSupporter = function(user,callback) {
    new Supporter({email: user })
        .fetch()
        .then(callback);
}

module.exports.getAllSupporter = function(callback) {
    new Supporter()
        .fetchAll()
        .then(callback);
}
module.exports.getUser = function(user,callback) {
    new User({username: user })
        .fetch()
        .then(callback);
}
module.exports.putSupporter = function(user,callback) {
    new Supporter(user).save()
        .then(callback);

}

module.exports.getUserForSupporter = function(user,callback) {
    new User().where({supporter : user}).fetchAll().then(callback);
}

module.exports.putUser = function(user,callback) {
    new User(user).save()
        .then(callback);
}

module.exports.putUserDailyLog = function(data,callback){
    new DailyLog(data).save().then(callback);
}
module.exports.putUserDailyActivities = function(data,callback){
    new DailyPhysicalActivity(data).save().then(callback);
}
module.exports.putUserWeeklyLog = function(data,callback){
    new WeeklySummarySheet(data).save().then(callback);
}

module.exports.getUserDailyLog = function(user,callback){
    new DailyLog().where({username : user}).fetchAll().then(callback);
}
module.exports.getUserDailyActivities = function(user,callback){
    new DailyPhysicalActivity().where({username : user}).fetchAll().then(callback);
}
module.exports.getUserWeeklyLog = function(user,callback){
    new WeeklySummarySheet().where({username : user}).fetchAll().then(callback);
}

module.exports.putAppointment = function(data,callback){
    new Appointment(data).save().then(callback);
}
module.exports.getAppointmentForSupporter = function(user,callback){
    new Appointment().where({supporter : user}).fetchAll().then(callback);
}

module.exports.removeAppointment = function(time,callback){

    console.log(time.Time);
    new Appointment().where({Time : time.Time}).destroy().then(callback)
}


module.exports.getAllAppointment = function(user,callback){
    new Appointment().fetchAll().then(callback);
}

module.exports.getSteps = function(callback){
    new Steps().fetchAll().then(callback);

}