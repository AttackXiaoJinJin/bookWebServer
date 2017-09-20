
var pool=require("./db_pool").pool;
var beautySql=require("./beauty_sql").sql;

exports.beautyDao={
    getBeauty:function (book_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            //client.query(articleSql.getArticleDetail,[article_id],function (err,result) {
            client.query(beautySql.getBeauty,[book_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在获取美句");
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

};


