
var pool=require("./db_pool").pool;
var recommentsSql=require("./recomments_sql").sql;

exports.recommentsDao={
    //=====================书
    //======================================插入对楼主回复
    insertBkRecom:function (user_id,recom_content,bookcom_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(recommentsSql.insertBkRecom,[user_id,recom_content,bookcom_id],function (err,result) {
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
            client.query(recommentsSql.showBkRecom,[user_id],function (err,result) {
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

    //=========================================文章
    //======================================插入对楼主回复
    insertArtRecom:function (user_id,recom_content,artcom_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(recommentsSql.insertArtRecom,[user_id,recom_content,artcom_id],function (err,result) {
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
            client.query(recommentsSql.showArtRecom,[user_id],function (err,result) {
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


