
var pool=require("./db_pool").pool;
var bkrecomSql=require("./bkrecom_sql").sql;

exports.bkrecomDao={
    //======================================插入对楼主回复
    insertBkRecom:function (user_id,recom_content,bookcom_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(bkrecomSql.insertBkRecom,[user_id,recom_content,bookcom_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在插入回复");
                    callback("e004");
                    return;
                }
                // console.log(JSON.stringify(result));
                callback(result);
                client.release();
            });
        });
    },
    //======================================查看他人对自己的回复
    showBkRecom:function (user_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(bkrecomSql.showBkRecom,[user_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在查看回复");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },


};


