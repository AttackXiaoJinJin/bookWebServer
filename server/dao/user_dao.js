
var pool=require("./db_pool").pool;
var userSql=require("../dao/user_sql").sql;
var SMS = require('aliyun-sms-node');
var sms = new SMS({
    AccessKeyId: 'LTAIitC8Df2W63Ed',
    AccessKeySecret: '7oa54sL25VfMK6G0w5FDq3ad83TtFW'
});

exports.userDao={


//=================================登录
    getPasswdByPhone:function (userPhone,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return;
            }
            client.query(userSql.getPasswdByPhone,[userPhone],function (err,result) {
                if(err){
                    console.log(err.message+"出错在通过手机获取密码");
                    callback("e004");
                    return;
                }
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
                    console.log(err.message+"出错在添加用户");
                    callback("e004");
                    return;
                }
                //console.log(resultC.length);
                //如果数据库的结果为0,则注册
                if (resultC.length == 0) {
                    client.query(userSql.addUser, [userPhone, userName,userPasswd], function (err, result) {
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
    addUserHead:function (fileName,user_id,callback) {
        // console.log(phone+fileName+"daodao");
        console.log(fileName);
        console.log(user_id);
        pool.getConnection(function (error,client) {
            if(error){
                callback("e004");
                return;
            }
            client.query(userSql.addUserHead,[fileName,user_id],function (err,result1) {
                if(err){
                    console.log(err.message+"出错在添加用户头像");
                    callback("e004");
                    return;
                }
                //console.log("userhead的result: "+JSON.stringify(result1));
                // console.log((result1[0][0].result)+"thisi s user_dao");
                var num_result=result1[0][0].result;
                callback(+num_result);
                client.release();
            })
        });
    },
//===================添加用户头像



    getUserHead:function (user_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                callback("e004");
                return;
            }
            client.query(userSql.getUserHead,[user_id],function (err,result1) {
                if(err){
                    console.log(err.message+"出错在获取用户头像");
                    callback("e004");
                    return;
                }
                // console.log(result1+"这是查询结果");
                callback(result1);
                client.release();
            })
        });
    },
//===========================获取用户头像

    getUserIdByPhone:function (phone,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                callback("e004");
                return;
            }
            client.query(userSql.getUserIdByPhone,[phone],function (err,result1) {
                if(err){
                    console.log(err.message+"出错在获取用户ID");
                    callback("e004");
                    return;
                }
                callback(result1);
                client.release();
            })
        });
    },


    getBasicInfo:function (user_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                callback("e004");
                return;
            }
            client.query(userSql.getBasicInfo,[user_id],function (err,result1) {
                if(err){
                    console.log(err.message+"出错在获取用户ID");
                    callback("e004");
                    return;
                }
                callback(result1);
                client.release();
            })
        });
    },
//===========================通过id获取用户基础信息


    getmoreBasicInfo:function (user_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                callback("e004");
                return;
            }
            client.query(userSql.getmoreBasicInfo,[user_id],function (err,result1) {
                if(err){
                    console.log(err.message+"出错在获取用户ID");
                    callback("e004");
                    return;
                }
                callback(result1);
                client.release();
            })
        });
    },
//===========================通过id获取用户更多信息

    getUserBook:function (user_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                callback("e004");
                return;
            }
            client.query(userSql.getUserBook,[user_id],function (err,result1) {
                if(err){
                    console.log(err.message+"出错在获取用户ID");
                    callback("e004");
                    return;
                }
                callback(result1);
                client.release();
            })
        });
    },
//===========================通过id获取用户喜欢的书

    getUserTopic:function (user_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                callback("e004");
                return;
            }
            client.query(userSql.getUserTopic,[user_id],function (err,result1) {
                if(err){
                    console.log(err.message+"出错在获取用户ID");
                    callback("e004");
                    return;
                }
                callback(result1);
                client.release();
            })
        });
    },
//===========================通过id获取用户关注的话题

    getUserArticle:function (user_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                callback("e004");
                return;
            }
            client.query(userSql.getUserArticle,[user_id],function (err,result1) {
                if(err){
                    console.log(err.message+"出错在获取用户ID");
                    callback("e004");
                    return;
                }
                callback(result1);
                client.release();
            })
        });
    },
//===========================通过id获取用户收藏的文章

//===========================通过id获取用户自己发表的文章(按时间)
    showUserPublish:function (user_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                callback("e004");
                return;
            }
            client.query(userSql.showUserPublish,[user_id],function (err,result1) {
                if(err){
                    console.log(err.message+"出错在获取用户ID");
                    callback("e004");
                    return;
                }
                callback(result1);
                client.release();
            })
        });
    },

    //===========================通过id获取用户自己发表的文章（按收藏）
    showUserPubColl:function (user_id,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                callback("e004");
                return;
            }
            client.query(userSql.showUserPubColl,[user_id],function (err,result1) {
                if(err){
                    console.log(err.message+"出错在获取用户ID");
                    callback("e004");
                    return;
                }
                callback(result1);
                client.release();
            })
        });
    },

    //======================================用户查看他人的回复
    showuserBkRecom:function (user_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(userSql.showuserBkRecom,[user_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在查看回复");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },

    //======================================用户中查看他人的回复
    showuserArtRecom:function (user_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(userSql.showuserArtRecom,[user_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在查看回复");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },

    //===================用户查看自己的评论
    showuserbookcom:function (user_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(userSql.showuserbookcom,[user_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在查看自己的评论");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },

    //===================用户查看自己书籍的回复的评论
    userbkcom:function (bookcom_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(userSql.userbkcom,[bookcom_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在查看自己的评论");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },
    //===================用户查看自己文章的回复的评论
    userartcom:function (articlecom_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(userSql.userartcom,[articlecom_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在查看自己的评论");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },

    //===================用户清除书的回复
    updatebk:function (user_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(userSql.updatebk,[user_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在清除书回复");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },

    //===================用户清除文章的回复
    updateart:function (user_id,callback) {
        pool.getConnection(function (err,client) {
            if(err){
                return;
            }
            client.query(userSql.updateart,[user_id],function (err,result) {
                if(err){
                    console.log(err.message+"出错在清除文章回复");
                    callback("e004");
                    return;
                }
                callback(result);
                client.release();
            });
        });
    },

};


