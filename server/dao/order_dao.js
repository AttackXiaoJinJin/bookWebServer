var pool=require("./db_pool").pool;
var orderSql=require("./order_sql").sql;

exports.orderDao={
    //=================================================获取订单详情
    showOrder:function (user_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(orderSql.showOrder,[user_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在获取订单");
                    callback("e004");
                    return;
                }
                console.log(JSON.stringify(result));
                callback(result);
                client.release();
            });
        });
    },

    //==========================================插入订单
    insertOrder:function (user_id,book_id,order_num,order_bianhao,receive_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(orderSql.insertOrder,[user_id,book_id,order_num,order_bianhao,receive_id],function (error,result) {
                if(error){
                    console.log(error.message+"出错在插入订单");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },

    //==========================================删除订单
    deleteOrder:function (order_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(orderSql.deleteOrder,[order_id],function (error,result) {
                if(error){
                    console.log(error.message+"出错在删除订单");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },





};


