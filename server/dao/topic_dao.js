
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
    //按关注获取全部话题

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
    }
    //按文章数获取全部话题


};


