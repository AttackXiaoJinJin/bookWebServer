
var pool=require("./db_pool").pool;
var booksSql=require("./books_sql").sql;

exports.booksDao={
    getAllBooks:function (callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(booksSql.getAllBooks,function (error,result) {
                if(error){
                    console.log(err.message+"出错在获取全部书籍");
                    callback('e004');
                    return;
                }

                callback(result);
                client.release();
            })
        })
    },
    //获取所有图书,待定,通过分类获取

    getMostComBooks:function (callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(booksSql.getMostComBooks,function (err,result) {
                if(err){
                    console.log(err.message+"出错在获取推荐书籍");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //获取推荐书籍,按照评论数排序

    getBookDetail:function (book_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(booksSql.getBookDetail,[book_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在获取书籍详情");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //=================================================获取书的详情

    classBookByTag:function (book_tag,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(booksSql.classBookByTag,[book_tag],function (err,result) {
                if(err){
                    console.log(err.message+"出错在通过标签分类书籍");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //=========================================================按照book_tag来分类书

    showlove:function (user_id,book_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(booksSql.showlove,[user_id,book_id],function (err,result) {
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
    //========================================================显示love

    insertlove:function (user_id,book_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(booksSql.insertlove,[user_id,book_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在插入love");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //========================================================喜欢书insert,可能需要再次确认

    deletelove:function (love_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(booksSql.deletelove,[love_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在删除love");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //========================================================取消喜欢书delete,可能需要再次确认

    searchBook:function (searchCon,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(booksSql.searchBook,[searchCon],function (err,result) {
                if(err){
                    console.log(err.message+"出错搜索书籍");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //========================================================搜索书籍


};


