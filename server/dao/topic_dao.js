
var pool=require("./db_pool").pool;
var topicSql=require("./topic_sql").sql;

exports.topicDao={
    getAllTopicsByAttent:function (callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(topicSql.getAllTopicsByAttent,function (error,result) {
                if(error){
                    console.log(err.message+"出错在按关注获取全部话题");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },
    //================================================================按关注获取全部话题

    getAllTopicsByArticle:function (callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(topicSql.getAllTopicsByArticle,function (error,result) {
                if(error){
                    console.log(err.message+"出错在按文章数获取全部话题");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },
    //====================================================================按文章数获取全部话题

    getMostComArticleByTopic:function (topic_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(topicSql.getMostComArticleByTopic,[topic_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在通过话题分类文章");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //=========================================================按照话题来分类文章(评论数排序)


    showattent:function (user_id,topic_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(topicSql.showattent,[user_id,topic_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在显示attent");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //========================================================显示attent

    insertattent:function (user_id,topic_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(topicSql.insertattent,[user_id,topic_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在插入attent");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //========================================================关注话题insert,可能需要再次确认

    deleteattent:function (attent_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(booksSql.deleteattent,[attent_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在删除attent");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //========================================================取消关注话题delete,可能需要再次确认







};


