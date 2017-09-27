module.exports = function (db, cb) {
    db.define('user', {
        id : {type: 'serial', key: true},
        username : String,
        password : String,
        name : String,
        cname : String,
        description : String
    });

    return cb();
};