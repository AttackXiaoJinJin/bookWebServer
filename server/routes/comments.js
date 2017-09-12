var express = require('express');
var router = express.Router();
var com_dao=require("../dao/comments_dao").comsDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");


router.post('/bookcoms',function(request, response, next) {
    var data=request.body;
    if(data){
        if(data.user_id && data.book_id){
        com_dao.insertBookComments(data.bookcom_content,data.user_id,data.book_id,function (result) {
            if(result=="e004"){
                response.json({"statusCode":result});
            }else if(result.affectedRows==1){
                    // console.log(JSON.stringify(result));
                    //成功
                    response.json({"statusCode":22});
                }else {
                //失败
                    response.json({"statusCode":23});
                }
        });
    }else{
            response.json({"statusCode":24});
        }
    }else {
        console.log("无法获取页面信息！")
    }

    });
//============上面是插入某本书的评论,先检查用户是否登录,该书是否存在,否则不能评论

router.post('/articlecoms',function(request, response, next) {
    var data=request.body;
    if(data){
        if(data.user_id && data.article_id){
        com_dao.insertArticleComments(data.articlecom_content,data.article_id,data.user_id,function (result) {
            if(result=="e004"){
                response.json({"statusCode":result});
            }else if(result.affectedRows==1){
                    // console.log(JSON.stringify(result));
                    //成功
                    response.json({"statusCode":25});
                }else {
                //失败
                    response.json({"statusCode":26});
                }
        });
    }else{
            response.json({"statusCode":27});
        }
    }else {
        console.log("无法获取页面信息！")
    }

    });
//============上面是插入某文章的评论

router.post('/showbookcoms',function(request, response, next) {
    var data=request.body;
    if(data){
        if(data.book_id){
        com_dao.showBookComs(data.book_id,function (result) {
            if(result=="e004"){
                response.json({"statusCode":result});
            }else if(result){
                    console.log(JSON.stringify(result));
                    //成功
                    response.json({"statusCode":28});
                }else {
                //失败
                    response.json({"statusCode":29});
                }
        });
    }else{
            response.json({"statusCode":24});
        }
    }else {
        console.log("无法获取页面信息！")
    }

    });
//============上面是显示书的评论

router.post('/showbookcoms',function(request, response, next) {
    var data=request.body;
    if(data){
        if(data.book_id){
        com_dao.showBookComs(data.book_id,function (result) {
            if(result=="e004"){
                response.json({"statusCode":result});
            }else if(result){
                    console.log(JSON.stringify(result));
                    //成功
                    response.json({"statusCode":28});
                }else {
                //失败
                    response.json({"statusCode":29});
                }
        });
    }else{
            response.json({"statusCode":24});
        }
    }else {
        console.log("无法获取页面信息！")
    }

    });
//============上面是显示书的评论







module.exports = router;
