module.exports = function (db, cb) {
    db.define('website_uploads', {
        id : {type: 'serial', key: true},
        filename : String,
        filenameTarget : String,
        userid : Number,
        date : Date,
        subject_name : String,
        subject_description : String
    });

    return cb();
};