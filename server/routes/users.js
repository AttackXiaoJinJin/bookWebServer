var express = require('express');
var router = express.Router();
var user_dao=require("../dao/user_dao").userDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");

// router.get('/login', function(request, response, next) {
//     var user=request.query;
//     console.log("aaa");
//     console.log(user+"get==");
//     response.json({"statusCode":3});
// });

router.post('/login',function(request, response, next) {
    var user=request.body;
    if(user){
        // console.log(user.loginPhone+"this is user");
        //这里的loginPhone是html中的name值
        //回调的result是数据库中查询的值，属性也是数据库中定义的属性
        user_dao.getPasswdByPhone(user.loginPhone,function (result) {
            // console.log(result[0]+" this is passwd");
            //如果result传来的e004则直接告诉用户，否则去解析result
            if(result=="e004"){
                response.json({"statusCode":result});
            }else {
                if(result.length==0){
                    //产生令牌
                    user_dao.createToken(util.createUnique(),function (result) {
                        if(result.affectedRows==1){
                            response.json({"statusCode":3,"user_token":util.createUnique()});
                        }
                    });
                }else {
                    if(result[0].user_passwd==user.loginPasswd){
                        // if(result[0].user_passwd==util.MD5(user.loginPasswd)){
                        response.json({"statusCode":1});
                    }else {
                        response.json({"statusCode":2});
                    }
                }
            }
        })
    }else{
        console.log("user的json数据为空,不存在该用户");
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
        console.log(files.uploadFile.type+"图片格式是");
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
                user_dao.addUserHead(fields.fromPhone,avatarName,function (result) {
                    console.log(result+" this is users");
                    if(result==1){
                        response.json({"statusCode":1});
                    }else{
                        response.json({"statusCode":0})
                    }
                    /*
                    if(err){
                        console.log(err);
                    }*/
                });
            });
        }
    })
});
//=======================upload头像

router.post('/getUserHead', function(request, response, next) {
    // console.log("aaaaaaaaaaaaaaaaaaaa");
    var loginPhone=request.body.phone;
    // console.log(loginPhone+" this is getUserHead");
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
   user_dao.getPasswdByPhone(user.registPhone,function (result) {
       //e004说明数据库异常
       if(result=='e004'){
            response.json({'statusCode':result});
       }else{
           //说明该用户数据库中没有
           if(result.length==0){
               //添加用户
               user_dao.addUser(user.registPhone,user.registName,user.registPasswd,function (result) {

                   //如果添加用户成功,result返回1
                   if(result){
                       response.json({"statusCode":6});
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



//=====================用户发表文章

module.exports = router;
