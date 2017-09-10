
var pool=require("./db_pool").pool;
var userSql=require("../dao/user_sql").sql;

exports.userDao={
    getPasswdByPhone:function (userPhone,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return;
            }
            client.query(userSql.getPasswdByPhone,[userPhone],function (err,result) {
                if(err){
                    console.log(err.message+" from getPasswdByPhone");
                    callback("e004");
                    return;
                }
                console.log(" userdao_result");
                callback(result);
                client.release();
            })
        });
    },
    //=========================getPasswdById,login
    //获取用户电话，昵称，密码
    addUser:function (userPhone,userName,userPasswd,callback) {
        //userDao对象
        // this.getPasswdByPhone(userSql.getPasswdByPhone,[userPhone],function (result) {
        //调用sql查询语句
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(userSql.getPasswdByPhone,[userPhone],function (err,resultC) {
                if(err){
                    console.log(err.message+" from getPasswdByPhone");
                    callback("e004");
                    return;
                }
                //console.log(resultC.length);
                //如果数据库的结果为0,则注册
                if (resultC.length == 0) {
                    client.query(userSql.addUser, [userPhone, userName, "boy.jpg", userPasswd], function (err, result) {
                        // console.log(sql);
                        if (err) {
                            console.log(err.message);
                            return;
                        }
                        callback(result.affectedRows);

                    });
                } else {
                    //有结果，则用户已存在
                    callback("5");
                }
                client.release();
            });


        });

    },
    //==========================addUser,添加用户
    /*
    createToken:function (token,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return;
            }
            client.query(userSql.createToken,[token],function (err,result) {
                if(err){
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            })
        });
    },

    getUserIcon:function (phone,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return;
            }
            client.query(userSql.getPasswdByPhone,[userPhone],function (err,result) {
                if(err){
                    console.log(err.message+" from getUserIcon");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            })
        });
    },
    */
    addUserHead:function (phone,fileName,callback) {
        console.log(phone+fileName+"daodao");
        pool.getConnection(function (error,client) {
            if(error){
                callback("e004");
                return;
            }
            client.query(userSql.addUserHead,[phone,fileName],function (err,result1) {
                if(err){
                    console.log(err.message+" from addUserHead");
                    callback("e004");
                    return;
                }
                //console.log("userhead的result: "+JSON.stringify(result1));
                console.log((result1[0][0].result)+"thisi s user_dao");
                var num_result=result1[0][0].result;
                callback(+num_result);
                client.release();
            })
        });
    },

    getUserHead:function (phone,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                callback("e004");
                return;
            }
            client.query(userSql.getUserHead,[phone],function (err,result1) {
                if(err){
                    console.log(err.message+" from getUserHead");
                    callback("e004");
                    return;
                }
                // console.log(result1+"这是查询结果");
                callback(result1);
                client.release();
            })
        });
    }






};


