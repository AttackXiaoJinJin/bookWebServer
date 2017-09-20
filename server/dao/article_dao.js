
var pool=require("./db_pool").pool;
var articleSql=require("./article_sql").sql;

exports.articleDao={
    getMostComArticle:function (callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(articleSql.getMostComArticle,function (err,result) {
                if(err){
                    console.log(err.message+"出错在获取推荐文章");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //=================================获取推荐文章,按照评论数排序

    getArticleDetail:function (article_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            //client.query(articleSql.getArticleDetail,[article_id],function (err,result) {
            client.query(articleSql.getArticleDetail,[article_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在获取文章详情");
                    callback("e004");
                    return;
                }
                console.log(JSON.stringify(result));
                callback(result);
                client.release();
            });
        });
    },
    //=================================================获取文章的详情



    showcollect:function (user_id,article_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(articleSql.showcollect,[user_id,article_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在显示love");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //========================================================显示collect

    insertcollect:function (user_id,article_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(articleSql.insertcollect,[user_id,article_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在插入collect");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //========================================================喜欢文章insert,可能需要再次确认

    deletecollect:function (collect_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(articleSql.deletecollect,[collect_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在删除collect");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //========================================================取消收藏文章delete,可能需要再次确认

    insertArticle:function (user_id,topic_id,article_content,article_title,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(articleSql.insertArticle,[user_id,topic_id,article_content,article_title],function (err,result) {
                if(err){
                    console.log(err.message+"出错在插入文章");
                    callback("e004");
                    return;
                }
                console.log(JSON.stringify(result));
                callback(result);
                client.release();
            });
        });
    },
    //=================================================插入文章


};


