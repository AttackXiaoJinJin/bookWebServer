
var pool=require("./db_pool").pool;
var comsSql=require("./comments_sql").sql;

exports.comsDao={
    insertBookComments:function (bookcom_content,user_id,book_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(comsSql.insertBookComments,[bookcom_content,user_id,book_id],function (error,result) {
                if(error){
                    console.log(error.message+"出错在书籍评论");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },
    //评论书
    insertArticleComments:function (articlecom_content,article_id,user_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(comsSql.insertArticleComments,[articlecom_content,article_id,user_id],function (error,result) {
                if(error){
                    console.log(error.message+"出错在文章评论");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },
    //=======================评论文章

    showBookComs:function (book_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(comsSql.showBookComs,[book_id],function (error,result) {
                if(error){
                    console.log(error.message+"出错在显示书评论");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },
    //==================================================显示某书的评论



    showArticleComs:function (article_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(comsSql.showArticleComs,[article_id],function (error,result) {
                if(error){
                    console.log(error.message+"出错在显示文章评论");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },
    //==================================================显示某文章的评论



    bookcomlike:function (bookcom_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(comsSql.bookcomlike,[bookcom_id],function (error,result) {
                if(error){
                    console.log(error.message+"出错在给书的评论点赞");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },
    //================给一本书的评论点赞(like_num+1)

    articlecomlike:function (articlecom_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(comsSql.articlecomlike,[articlecom_id],function (error,result) {
                if(error){
                    console.log(error.message+"出错在给文章的评论点赞");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },
    //================给一篇文章的评论点赞(like_num+1)

};


