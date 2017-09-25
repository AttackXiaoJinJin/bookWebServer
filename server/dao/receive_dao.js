
var pool=require("./db_pool").pool;
var receiveSql=require("./receive_sql").sql;

exports.receiveDao={
    //==========================显示收货表
    showreceive:function (user_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(receiveSql.showreceive,[user_id],function (error,result) {
                if(error){
                    console.log(error.message+"出错在显示收货表");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },
    //==========================================新增收货地址
    insertreceive:function (user_id,receive_name,receive_address,receive_phone,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(receiveSql.insertreceive,[user_id,receive_name,receive_address,receive_phone],function (error,result) {
                if(error){
                    console.log(error.message+"出错在插入收货地址");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },

    //修改收货地址=========================================
    updatereceive:function (receive_name,receive_address,receive_phone,receive_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(receiveSql.updatereceive,[receive_name,receive_address,receive_phone,receive_id],function (error,result) {
                if(error){
                    console.log(error.message+"出错在修改收货地址");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },

    //删除收货地址=========================================
    deletereceive:function (receive_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(receiveSql.deletereceive,[receive_id],function (error,result) {
                if(error){
                    console.log(error.message+"出错在删除收货地址");
                    callback('e004');
                    return;
                }
                callback(result);
                client.release();
            })
        })
    },


};


