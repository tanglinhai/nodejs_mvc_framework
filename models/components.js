module.exports = function (db, cb) {
    db.define('components', {
        id : {type: 'serial', key: true},
        title : String,
        ctitle : String,
        description : String,
        code : Buffer,
        userid : Number,
        date : Date,
        filenameTarget : String
    });
    return cb();
};