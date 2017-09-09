
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
                    callback('e004');
                    return;
                }

                callback(result);
                client.release();
            })
        })
    }
};


