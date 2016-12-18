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
var Images = bookshelf.Model.extend({
    tableName: 'Images'
});

var Notes = bookshelf.Model.extend({
    tableName: 'Notes'
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

module.exports.putImageData = function(data,callback) {
    new Images(data).save().then(callback);
}

// module.exports.updateImageData = function(image,data,callback) {
//     new Images().where({image : image}).save({responses: data}, {patch: true}).then(callback);
// }



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

module.exports.getAllUsers = function(callback) {
    new User()
        .fetchAll()
        .then(callback);
}

// remove supporter for user
module.exports.removeUser = function(user, callback) {
    new User().where({username: user}).save({supporter: null}, {patch: true}).then(callback);
}

module.exports.updateStep = function(user,step, callback) {
    new User().where({username: user}).save({step: step}, {patch: true}).then(callback);
}

module.exports.getUserForSupporter = function(user,callback) {
    new User().where({supporter : user}).fetchAll().then(callback);
}

module.exports.putUser = function(user,callback) {
    new User(user).save()
        .then(callback);
}

module.exports.updateUser = function(data,callback) {
    new User().where({username : data.username}).save({noteData : data.noteData}, {patch : true})
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
    new Appointment(data).save(null, {method: 'insert'}).then(callback);
}

module.exports.updateAppointment = function(data,callback){
    new Appointment().where({id: data.id}).save({Time: data.Time}, {patch: true}).then(callback);
    // new Appointment(data).save(null, {method: 'update'}).then(callback);
}

module.exports.getAppointmentForSupporter = function(user,callback){
    new Appointment().where({supporter : user}).fetchAll().then(callback);
}

module.exports.getAppointmentForUser = function(user,callback){
	new Appointment().where({username : user}).fetchAll().then(callback);
}

module.exports.removeAppointment = function(time,callback){

    console.log(time.Time);
    new Appointment().where({Time : time.Time}).destroy().then(callback)
}

module.exports.getAllImageData = function(callback){
    new Images().fetchAll().then(callback);
}

module.exports.getSteps = function(callback){
    new Steps().fetchAll().then(callback);

}

//adding notes
module.exports.addNote = function(data, callback){
    new Appointment().where({id: data.id}).save({description: data.description}, {patch: true}).then(callback);

}

// getting notes for user
module.exports.getNotesforUser = function(username, callback){
    new Notes().where({Username: username}).fetchAll().then(callback);
}
