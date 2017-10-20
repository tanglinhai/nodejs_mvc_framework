const mysql=require("mysql");
const dbconfig=require("../config/db");
const pool = mysql.createPool({
    host: dbconfig.host,
    user: dbconfig.username,
    password: dbconfig.password,
    database: dbconfig.database,
    port: dbconfig.port
});

module.exports = {
    query_promise: (sql, params)=>{
        return new Promise((resolve, reject)=>{
            pool.getConnection((err,conn)=>{
                if(err){
                    resolve({
                        err: err,
                        vals: null,
                        fields: null
                    });
                }else{
                    conn.query(sql, params, (qerr,vals,fields)=>{
                        //release
                        conn.release();
                        //event callback
                        resolve({
                            err: qerr,
                            vals: vals,
                            fields: fields
                        });
                    });
                }
            });
        });
    },
    query: (sql, params, callback)=>{
        pool.getConnection((err,conn)=>{
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql, params, (qerr,vals,fields)=>{
                    //release
                    conn.release();
                    //event callback
                    callback(qerr,vals,fields);
                });
            }
        });
    },
    //解码
    html_decode: (str)=>{
        let s = "";
        if (str.length == 0) return "";
        s = str.replace(/&gt;/g, ">");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "'");
        s = s.replace(/&quot;'/g, "\"");
        return s;
    },
    //编码
    html_encode: (str)=>{
        let s = "";
        if (str.length == 0) return "";
        s = str.replace(/>/g, "&gt;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/'/g, "&#39;");
        s = s.replace(/"/g, "&quot;");
        return s;
    }
};