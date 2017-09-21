
var pool=require("./db_pool").pool;
var topicSql=require("./topic_sql").sql;

exports.topicDao={
    getAllTopics:function (callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(topicSql.getAllTopics,function (error,result) {
                if(error){
                    console.log(err.message+"出错在简单获取全部话题");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },
    //================================================================简单获取所有话题

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

    getTopicById:function (topic_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(topicSql.getTopicById,[topic_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在通过topic_id获取话题");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //=========================================================按照topic_id获取该话题

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


    getTopicIdByname:function (topic_name,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(topicSql.getTopicIdByname,[topic_name],function (err,result) {
                if(err){
                    console.log(err.message+"出错在获取topicid_byname");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //========================================================通过name获取id

    searchTopic:function (searchCon,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(topicSql.searchTopic,[searchCon],function (err,result) {
                if(err){
                    console.log(err.message+"出错在搜索话题");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //========================================================搜索话题



};


