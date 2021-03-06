module.exports = function (db, cb) {
    db.define('user', {
        id : {type: 'serial', key: true},
        username : String,
        password : String,
        name : String,
        cname : String,
        phone : String,
        email : String,
        description : String,
        type : Number,
        create_date : Date
    });

    return cb();
};