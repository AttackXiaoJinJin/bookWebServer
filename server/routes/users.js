var express = require('express');
var router = express.Router();
var user_dao=require("../dao/user_dao").userDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/userhead/";
var fs=require("fs");

//产生令牌
var jwt=require('jwt-simple');
var moment = require('moment');
//checkToken
var ct=require("../utils/checkToken");

var sm=require("../utils/utilmessage");


router.post('/sendmessage',sm.sendmessage,function(request, response, next) {


});



router.post('/login',function(request, response, next) {
    var user=request.body;
    if(user){
        // console.log(user.loginPhone+"this is user");
        //这里的loginPhone是html中的name值
        //回调的result是数据库中查询的值，属性也是数据库中定义的属性
        user_dao.getPasswdByPhone(user.loginPhone,function (result) {
            //如果result传来的e004则直接告诉用户，否则去解析result
            if(result=="e004"){
                response.json({"statusCode":result});
            }else {

                if(result.length==0){
                    //产生令牌
                    // user_dao.createToken(util.createUnique(),function (result) {
                    //     if(result.affectedRows==1){
                    //         response.json({"statusCode":3,"user_token":util.createUnique()});
                            response.json({"statusCode":3});
                        // }
                    // });
                }else {
                    // if(result[0].user_passwd==user.loginPasswd){
                        //MD5加密
                        if(result[0].user_passwd==util.MD5(user.loginPasswd)){
                            //产生令牌
                            /*
                            var expires=moment().add(7,'days').valueOf();
                            var token=jwt.encode({
                                iss:user.loginPhone,
                                exp:expires
                            },util.secret);
                            response.json({"statusCode":1,token:token});
                            */
                            // response.json({"statusCode":1});
                            response.json(result);

                    }else {
                        response.json({"statusCode":2});
                    }
               }
            }
        });
        //============上面是根据手机号获取密码和用户的id
    }
});
//==========================用户登录

router.post('/upload', function(request, response, next) {
    // console.log("aaaaaaaaaa");
    //创建上传表单
    var form=new formidable.IncomingForm();
    //由于Node.js安装的盘符和写的地方不在一个盘符，跨目录重命名文件导致的问题。
    // 重设临时上传路径
    form.uploadDir = "./tmp";
    form.encoding="utf-8";
    form.parse(request,function (err,fields,files) {
        if(err){
            response.locals.error=err;
            response.send("upload error");
            return;
        }
        //后缀名
        var extName='';
        //input name:uploadFile
        // console.log(files);
        // console.log(files.uploadFile);
        // console.log(fields);
        // console.log(files.uploadFile.type+"图片格式是");
        switch (files.uploadFile.type){
            case 'image/jpeg':extName='jpeg';break;
            case 'image/jpg':extName='jpg';break;
            case 'image/png':extName='png';break;
            case 'image/x-png':extName='png';break;
        }
        if(extName.length==0){
            //图片格式不正确
            response.json({"statusCode":"e005"});
            return;
        }else {
            form.uploadDir='../public'+AVATARUPLOAD_FOLDER;
            form.keepExtensions=true;
            //图片大小不超过5兆
            form.maxFieldsSize=5*1024;
            var avatarName=util.createUnique()+'.'+extName;
            //'public/upload/d233452.jpg'
            //    1      2       3
            var newPath=form.uploadDir+avatarName;
            console.log("old"+files.uploadFile.path);
            console.log("newpath----"+newPath);
            //  重命名      用户上传的文件路径,服务器自己创建的路径
            // fs.renameSync(files.uploadFile.path,newPath);
            fs.rename(files.uploadFile.path,newPath,function (error) {
                if(error){
                    response.json({"stateCode":'e005'});
                    return;
                }
                // console.log(fields);
                user_dao.addUserHead(avatarName,fields.user_id,function (result) {
                    console.log(result+" this is users");
                    if(result==1){
                        //成功
                        console.log("上传成功");
                        response.json({"statusCode":-1});
                    }else{
                        //失败
                        response.json({"statusCode":0})
                    }
                });
            });
        }
    })
});
//=======================upload头像

router.post('/getUserHead', function(request, response, next) {
    var loginPhone=request.body.phone;
    user_dao.getUserHead(loginPhone,function (result) {
        console.log(result[0].user_head+"这是图片路径");
        if(result.length==0){
            response.json({"user_head":"head_default.jpg"});
        } else {
            response.json({"user_head":result[0].user_head});
        }
    });
    console.log(loginPhone);
});
//==============================加载用户头像

router.post('/addUser', function(request, response, next) {
   //从html获取注册的手机号
    var user=request.body;
    //如果从html传来的数据存在
    if(user){
   user_dao.getPasswdByPhone(user.user_phone,function (result) {
       //e004说明数据库异常
       if(result=='e004'){
            response.json({'statusCode':result});
       }else{
           //说明该用户数据库中没有
           if(result.length==0){
               //添加用户
               // user_dao.addUser(user.registPhone,user.registName,user.registPasswd,function (result) {
               //MD5加密密码
               user_dao.addUser(user.user_phone,user.user_name,util.MD5(user.user_passwd),function (result) {
               // user_dao.addUser(user.user_phone,user.user_name,user.user_passwd,function (result) {
                   if(result){
                       // user_dao.getPasswdByPhone(user.registPhone,function (resultC) {
                           // response.json({"statusCode":6},{"user_id":resultC[0].user_id});
                           response.json({"statusCode":6});
                           //获取用户ID
                           // console.log(resultC[0].user_id+"users.js");
                       // })

                   }else{
                       //注册失败
                       response.json({"statusCode":7});
                   }
               });
              // response.json({"statusCode":3});
           }else{
               // 说明该用户数据库已存在
               response.json({"statusCode":5})
           }
       }
   })
    }else{
        console.log("注册数据为空");
    }
});
//=================================注册用户


router.post('/getIdByPhone', function(request, response, next) {
    //从html获取注册的手机号
    var user=request.body;
    //如果从html传来的数据存在
    if(user){
        // user_dao.getUserIdByPhone(user.registPhone,function (result) {
        user_dao.getUserIdByPhone(user.user_phone,function (result) {
            //e004说明数据库异常
            if(result=='e004'){
                response.json({'statusCode':result});
            }else{
                //说明该用户ID数据库中没有
                if(result.length==0){
                    response.json({"statusCode":11})
                }else{
                    //返回user_id
                    response.json(result)
                }
            }
        })
    }else{
        console.log("获取数据为空");
    }
});

//====================================注册后通过手机号获取用户ID


router.post('/getbasebyid', function(request, response, next) {
    var user=request.body;
    if(user){
        user_dao.getBasicInfo(user.user_id,function (result) {
            //e004说明数据库异常
            if(result=='e004'){
                response.json({'statusCode':result});
            }else{
                //说明该用户ID数据库中没有
                if(result.length==0){
                    response.json({"statusCode":11})
                }else{
                    //返回基础信息
                    response.json(result)
                }
            }
        })
    }else{
        console.log("获取数据为空");
    }
});

//====================================通过手机号获取用户基本信息


router.post('/getmorebyid', function(request, response, next) {
    var user=request.body;
    if(user){
        user_dao.getmoreBasicInfo(user.user_id,function (result) {
            //e004说明数据库异常
            if(result=='e004'){
                response.json({'statusCode':result});
            }else{
                //说明该用户ID数据库中没有
                if(result.length==0){
                    response.json({"statusCode":11})
                }else{
                    //返回基础信息
                    response.json(result)
                }
            }
        })
    }else{
        console.log("获取数据为空");
    }
});

//====================================通过手机号获取用户更多信息

router.post('/userbook', function(request, response, next) {
    var user=request.body;
    if(user){
        user_dao.getUserBook(user.user_id,function (result) {
            //e004说明数据库异常
            if(result=='e004'){
                response.json({'statusCode':result});
            }else{
                //说明该用户ID数据库中没有
                if(!result[0][0].love_id){
                    console.log(result[0][0].love_id);
                    response.json({"statusCode":83})
                }else{
                    //success
                    response.json(result)
                }
            }
        })
    }else{
        console.log("获取数据为空");
    }
});

//====================================通过id获取用户喜欢书(喜欢时间排序)

router.post('/usertopic', function(request, response, next) {
    var user=request.body;
    if(user){
        user_dao.getUserTopic(user.user_id,function (result) {
            //e004说明数据库异常
            if(result=='e004'){
                response.json({'statusCode':result});
            }else{
                //说明该用户ID数据库中没有
                if(!result[0][0].attent_id){
                    console.log(result[0][0].attent_id);
                    response.json({"statusCode":84})
                }else{
                    //success
                    response.json(result)
                }
            }
        })
    }else{
        console.log("获取数据为空");
    }
});

//====================================通过id获取用户关注话题(关注时间排序)

router.post('/userarticle', function(request, response, next) {
    var user=request.body;
    var rr;
    if(user){
        user_dao.getUserArticle(user.user_id,function (result) {
            //e004说明数据库异常
            if(result=='e004'){
                response.json({'statusCode':result});
            }else{
                rr=JSON.stringify(result);
                console.log(rr);
                //说明该用户ID数据库中没有
                if(!result[0][0].collect_id){
                    console.log(result[0][0].collect_id);
                    response.json({"statusCode":85})
                }else{
                    //success
                    response.json(result)
                }
            }
        })
    }else{
        console.log("获取数据为空");
    }
});

//====================================通过id获取用户收藏文章(收藏时间排序)

//====================================通过id获取用户发表的文章(按时间排序)
router.post('/showuserpub', function(request, response, next) {
    var user=request.body;
    var rr;
    if(user){
        user_dao.showUserPublish(user.user_id,function (result) {
            //e004说明数据库异常
            if(result=='e004'){
                response.json({'statusCode':result});
            }else{
                rr=JSON.stringify(result);
                console.log(rr);
                //说明该用户ID数据库中没有
                if(!result[0][0]){
                    console.log(result[0][0]);
                    response.json({"statusCode":105})
                }else{
                    //success
                    response.json(result[0])
                }
            }
        })
    }else{
        console.log("获取数据为空");
    }
});

//====================================通过id获取用户发表的文章(按收藏排序)
router.post('/showuserpubcoll', function(request, response, next) {
    var user=request.body;
    var rr;
    if(user){
        user_dao.showUserPubColl(user.user_id,function (result) {
            //e004说明数据库异常
            if(result=='e004'){
                response.json({'statusCode':result});
            }else{
                rr=JSON.stringify(result);
                console.log(rr);
                //说明该用户ID数据库中没有
                if(!result[0][0]){
                    console.log(result[0][0]);
                    response.json({"statusCode":106})
                }else{
                    //success
                    response.json(result[0])
                }
            }
        })
    }else{
        console.log("获取数据为空");
    }
});

//=============================用户查看回复
router.post('/showuserrecom', function(request, response, next) {
    var user=request.body;
    // console.log(recom);
    if(user){
        user_dao.showuserBkRecom(user.user_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result[0].length==0) {
                    response.json({"statusCode":120});
                } else {
                    response.json(result[0]);
                }
            }
        });
    }
});

//=============================用户查看其他用户的回复
router.post('/showuserartrecom', function(request, response, next) {
    var user=request.body;
    // console.log(recom);
    if(user){
        user_dao.showuserArtRecom(user.user_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result[0].length==0) {
                    response.json({"statusCode":120});
                } else {
                    response.json(result[0]);
                }
            }
        });
    }
});

//=============================用户查看自己的书籍评论
router.post('/userbookcom', function(request, response, next) {
    var user=request.body;
    if(user){
        user_dao.showuserbookcom(user.user_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result[0].length==0) {
                    response.json({"statusCode":125});
                } else {
                    response.json(result[0]);
                }
            }
        });
    }
});

//=============================用户查看自己的书籍回复的评论
router.post('/userbkcom', function(request, response, next) {
    var user=request.body;
    if(user){
        user_dao.userbkcom(user.bookcom_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                    response.json(result[0][0]);
            }
        });
    }
});

//=============================用户查看自己的文章回复的评论
router.post('/userartcom', function(request, response, next) {
    var user=request.body;
    if(user){
        user_dao.userartcom(user.articlecom_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                    response.json(result[0][0]);
            }
        });
    }
});



//=============================用户清除书籍回复
router.post('/updatebk', function(request, response, next) {
    var user=request.body;
    if(user){
        user_dao.updatebk(user.user_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectedRows!=0) {
                    response.json({"statusCode":126});
                } else {
                    response.json(result);
                }
            }
        });
    }
});


//=============================用户清除文章回复
router.post('/updateart', function(request, response, next) {
    var user=request.body;
    if(user){
        user_dao.updateart(user.user_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectedRows!=0) {
                    response.json({"statusCode":127});
                } else {
                    response.json(result);
                }
            }
        });
    }
});


//========================获取所有用户
/*
router.get('/getAllUsers',ct.checkToken,function (req,res,next) {
   //鉴权
    var token=req.body.token post请求
    console.log(req.query);
    console.log();
    //get请求
    var token=req.query.token || req.header('token');

try {
    var tt=jwt.decode(token,util.secret);
    //如果成功执行next()
    next();
}catch (e){
    console.log(e.message);
    res.json({"statusCode":2})
 }


},function (req,res,next) {
    res.json({"statusCode":"ok"})

});
*/
module.exports = router;


