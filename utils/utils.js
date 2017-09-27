var mysql=require("mysql");
var dbconfig=require("../config/db");
var pool = mysql.createPool({
    host: dbconfig.host,
    user: dbconfig.username,
    password: dbconfig.password,
    database: dbconfig.database,
    port: dbconfig.port
});

module.exports = {
    query: function(sql, params, callback){
        pool.getConnection(function(err,conn){
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql, params, function(qerr,vals,fields){
                    //release
                    conn.release();
                    //event callback
                    callback(qerr,vals,fields);
                });
            }
        });
    },
    //解码
    html_decode: function (str){
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&gt;/g, ">");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "'");
        s = s.replace(/&quot;'/g, "\"");
        return s;
    },
    //编码
    html_encode: function (str){
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/>/g, "&gt;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/'/g, "&#39;");
        s = s.replace(/"/g, "&quot;");
        return s;
    }
};