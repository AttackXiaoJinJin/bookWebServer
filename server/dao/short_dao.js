
var pool=require("./db_pool").pool;
var shortSql=require("./short_sql").sql;

exports.shortDao={
    //==============================获取本书下所有短评（喜欢数排序）
    getAllShorts:function (book_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(shortSql.getAllShorts,[book_id],function (error,result) {
                if(error){
                    console.log(err.message+"出错在获取全部话题");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },

    //===============================按时间排序获取全部话题
    getAllShortsByTime:function (book_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(shortSql.getAllShortsByTime,[book_id],function (error,result) {
                if(error){
                    console.log(err.message+"出错在按时间排序获取全部话题");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },


    //=====================================插入短评
    insertShort:function (short_content,short_title,user_id,book_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(shortSql.insertShort,[short_content,short_title,user_id,book_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在插入短评");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },


//==============喜欢短评
    likeShort:function (short_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(shortSql.likeShort,[short_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在喜欢短评");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },



    //================讨厌短评
    dislikeShort:function (short_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(shortSql.dislikeShort,[short_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在讨厌短评");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },


    //===============搜索短评
    searchShort:function (searchCon,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(shortSql.searchShort,[searchCon],function (err,result) {
                if(err){
                    console.log(err.message+"出错在搜索短评");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },

};


