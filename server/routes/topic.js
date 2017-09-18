var express = require('express');
var router = express.Router();
var topic_dao=require("../dao/topic_dao").topicDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");


router.post('/topicbyattent',function(request, response, next) {
        topic_dao.getAllTopicsByAttent(function (result) {
            if(result=="e004"){
                response.json({"statusCode":result});
            }else if(result){
                    console.log(JSON.stringify(result));
                    response.json({"statusCode":60});
                }else {
                    response.json({"statusCode":61});
                }
        })
    });
//============上面是按关注数排话题

router.post('/topicbyarticle', function(request, response, next) {

    topic_dao.getAllTopicsByArticle(function (result) {
        if (result == "e004") {
            response.json({"statusCode": result});
        } else {
            if (result){response.json({"statusCode": 64});
            console.log(JSON.stringify(result))}
            else {response.json({"statusCode": 65});}
        }
        });
});
//=======================上面是按文章数排话题

router.post('/showattent', function(request, response, next) {
    var topic=request.body;
    // console.log(book);
    if(topic){
        topic_dao.showattent(topic.user_id,topic.topic_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.length == 0) {
                    //说明没找到attent_id
                    response.json({"statusCode":67});
                } else {
                    //获取成功
                    response.json({"statusCode":66});
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":68});
        console.log("user_id,topic_id不存在！")
    }
});
//====================================显示用户是否关注该话题

router.post('/showattent/insertattent', function(request, response, next) {
    var topic=request.body;
    // console.log(book);
    if(topic){
        topic_dao.insertattent(topic.user_id,topic.topic_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectedrows==1) {
                    //说明插入成功
                    response.json({"statusCode":69});
                } else {
                    //插入失败
                    response.json({"statusCode":70});
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":68});
        console.log("user_id,topic_id不存在！")
    }
});
//====================================用户点击关注该话题

router.post('/showattent/deleteattent', function(request, response, next) {
    var topic=request.body;
    // console.log(book);
    if(topic){
        topic_dao.deleteattent(topic.attent_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectedrows==1) {
                    //说明删除成功
                    response.json({"statusCode":71});
                } else {
                    //删除失败
                    response.json({"statusCode":72});
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":68});
        console.log("user_id,topic_id不存在！")
    }
});
//====================================用户点击不关注该话题


module.exports = router;
