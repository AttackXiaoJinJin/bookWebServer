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


module.exports = router;
