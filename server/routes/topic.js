var express = require('express');
var router = express.Router();
var topic_dao=require("../dao/topic_dao").topicDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");

router.post('/alltopics',function(request, response, next) {
    topic_dao.getAllTopics(function (result) {
        if(result=="e004"){
            response.json({"statusCode":result});
        }else if(result){
            console.log(JSON.stringify(result));
            // response.json({"statusCode":60});
            response.json(result);
        }else {
            response.json({"statusCode":78});
        }
    })
});
//===========================================上面是简单获取所有话题

router.post('/topicbyattent',function(request, response, next) {
        topic_dao.getAllTopicsByAttent(function (result) {
            if(result=="e004"){
                response.json({"statusCode":result});
            }else if(result){
                    console.log(JSON.stringify(result));
                    // response.json({"statusCode":60});
                    response.json(result);
                }else {
                    response.json({"statusCode":61});
                }
        })
    });
//===========================================上面是按关注数排话题

router.post('/topicbyarticle', function(request, response, next) {

    topic_dao.getAllTopicsByArticle(function (result) {
        if (result == "e004") {
            response.json({"statusCode": result});
        } else {
            if (result){
                // response.json({"statusCode": 64});
                response.json(result);
            console.log(JSON.stringify(result))}
            else {response.json({"statusCode": 65});}
        }
        });
});
//================================================上面是按文章数排话题

router.post('/gettopicbyid', function(request, response, next) {
    var topic=request.body;
    if(topic){
        topic_dao.getTopicById(topic.topic_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result[0].length==0) {
                    //说明没有话题
                    response.json({"statusCode":76});
                } else {
                    //获取成功
                    // response.json({"statusCode":75});
                    response.json(result);
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":68});
        console.log("该topic_id不存在！")
    }
});
//=====================================================通过topic_id获取话题

router.post('/topicarticle', function(request, response, next) {
    var topic=request.body;
    if(topic){
        topic_dao.getMostComArticleByTopic(topic.topic_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result[0].length == 0) {
                    //说明该标签下没有文章/失败
                    response.json({"statusCode":58});
                } else {
                    //获取成功
                    // response.json({"statusCode":57});
                    response.json(result);
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":59});
        console.log("该article_topic不存在！")
    }
});
//=====================================================通过话题分类获取最多评论文章

router.post('/topcolart', function(request, response, next) {
    var topic=request.body;
    if(topic){
        topic_dao.getMostCollectArticleByTopic(topic.topic_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result[0].length == 0) {
                    //说明该标签下没有文章
                    response.json({"statusCode":80});
                } else {
                    //获取成功
                    // response.json({"statusCode":79});
                    response.json(result);
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":59});
        console.log("该article_topic不存在！")
    }
});
//=====================================================通过话题分类获取最多收藏文章

router.post('/topnewart', function(request, response, next) {
    var topic=request.body;
    if(topic){
        topic_dao.getNewestArticleByTopic(topic.topic_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result[0].length == 0) {
                    //说明该标签下没有文章
                    response.json({"statusCode":80});
                } else {
                    //获取成功
                    // response.json({"statusCode":79});
                    response.json(result);
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":59});
        console.log("该article_topic不存在！")
    }
});
//=====================================================通过话题分类获取最新发布文章

router.post('/showallattent', function(request, response, next) {
    var topic=request.body;
    // console.log(book);
    if(topic){
        topic_dao.showallattent(topic.user_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.length == 0) {
                    //说明没找到attent_id
                    response.json({"statusCode":67});
                } else {
                    //获取成功
                    // response.json({"statusCode":66});
                    response.json(result);
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
//====================================显示用户关注的所有话题

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
                    // response.json(result);
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
                if (result.affectedRows==1) {
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
        topic_dao.deleteattent(topic.user_id,topic.topic_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectedRows==1) {
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

router.post('/topicidbyname', function(request, response, next) {
    var topic=request.body;
    if(topic){
        topic_dao.getTopicIdByname(topic.topic_name,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.length == 0) {
                    //说明没有该话题
                    response.json({"statusCode":68});
                } else {
                    //获取成功
                    response.json(result);
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":68});
        console.log("该topic不存在！")
    }
});
//=====================================================通过name获取id

router.post('/searchtopic', function(request, response, next) {
    var topic=request.body;
    if(topic){
        topic_dao.searchTopic(topic.searchCon,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result[0].length == 0) {
                    //说明搜索结果为空
                    response.json({"statusCode":87});
                } else {
                    //获取成功
                    response.json(result);
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":89});
        console.log("未输入搜索内容")
    }
});
//=====================================================搜索话题


//一次加载2个话题
router.post('/twotop', function(request, response, next) {
  var topic=request.body;
  if(topic){
    topic_dao.twotop(topic.m,topic.n,function (result) {
      if (result == "e004") {response.json({"statusCode": result});}
      else  {
        if (result[0].length==0) {
          //说明没有话题
          response.json({"statusCode":76});
        } else {
          //获取成功
          response.json(result[0]);
          console.log(JSON.stringify(result));
        }
      }
    });
  }
  else {
    response.json({"statusCode":68});
    console.log("该topic_id不存在！")
  }
});


module.exports = router;
