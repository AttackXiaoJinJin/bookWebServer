
var pool=require("./db_pool").pool;
var booksSql=require("./books_sql").sql;

exports.booksDao={
    getAllBooks:function (book_id,book_name,book_subhead,book_price,book_content,writer_id,book_catalog,book_img,book_year,callback) {
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
    //获取书的详情

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
    //按照book_tag来分类书

};


