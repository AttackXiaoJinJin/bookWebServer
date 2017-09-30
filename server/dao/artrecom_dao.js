
var pool=require("./db_pool").pool;
var artrecomSql=require("./artrecom_sql").sql;

exports.artrecomDao={
    //======================================插入对楼主回复
    insertArtRecom:function (user_id,recom_content,artcom_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(artrecomSql.insertArtRecom,[user_id,recom_content,artcom_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在插入回复");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //======================================查看他人对自己的回复
    showArtRecom:function (user_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(artrecomSql.showArtRecom,[user_id],function (err,result) {
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


