
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
    //======================================书中查看他人的回复
    showBkRecom:function (bookcom_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(recommentsSql.showBkRecom,[bookcom_id],function (err,result) {
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

    //======================================用户查看回复数
    userbknum:function (user_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(recommentsSql.userbknum,[user_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在查看回复数");
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
    insertArtRecom:function (user_id,recom_content,articlecom_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(recommentsSql.insertArtRecom,[user_id,recom_content,articlecom_id],function (err,result) {
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
    //======================================文章中查看他人的回复
    showArtRecom:function (articlecom_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(recommentsSql.showArtRecom,[articlecom_id],function (err,result) {
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

    //======================================用户查看回复数
    userartnum:function (user_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(recommentsSql.userartnum,[user_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在查看回复数");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },


};


