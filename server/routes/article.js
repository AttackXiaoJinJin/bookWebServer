var express = require('express');
var router = express.Router();
var article_dao=require("../dao/article_dao").articleDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");

router.post('/mostcomarticles', function(request, response, next) {

    article_dao.getMostComArticle(function (result) {
        if (result == "e004") {
            response.json({"statusCode": result});
        } else {
            if (result){response.json({"statusCode": 52});console.log(JSON.stringify(result))}
            else {response.json({"statusCode": 53});}
        }
        });
});
//=======================上面是根据评论数获取推荐的文章

router.post('/articledetail', function(request, response, next) {
    var article=request.body;
    console.log(article);
    if(book){
    article_dao.getArticleDetail(article.article_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result.length == 0) {
                //说明获取详情页失败
                response.json({"statusCode":55});
            } else {
                //获取成功
                response.json({"statusCode":54});
                console.log(JSON.stringify(result));
            }
        }
    });
    }
    else {
        response.json({"statusCode":56});
        console.log("获取文章详情的文章id不存在！")
    }
});
//==============================上面是获取某一个文章的详情

router.post('/classarticlebytopic', function(request, response, next) {
    var article=request.body;
    // console.log(book);
    if(article){
        article_dao.getMostComArticleByTopic(article.article_tag,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.length == 0) {
                    //说明该标签下没有文章
                    response.json({"statusCode":58});
                } else {
                    //获取成功
                    response.json({"statusCode":57});
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
//==========================通过标签分类书籍

// router.post('/insertbook', function(request, response, next) {
//
//     book_dao.classBookByTag(book.book_tag, function (result) {
//         if (result == "e004") {
//             response.json({"statusCode": result});
//         }
//         else {
//             if (result.length == 0) {
//                 //说明该标签下没有书
//                 response.json({"statusCode": 20});
//             } else {
//                 //获取成功
//                 response.json({"statusCode": 19});
//                 console.log(JSON.stringify(result));
//             }
//         }
//     });
// });
//========================插入图书(admin),需要先检查书名是否重复



//================================显示文章的collect数并递减排序

router.post('/showcollect', function(request, response, next) {
    var article=request.body;
    // console.log(book);
    if(article){
        article_dao.showcollect(article.user_id,article.article_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.length == 0) {
                    //说明没找到collect_id
                    response.json({"statusCode":46});
                } else {
                    //获取成功
                    response.json({"statusCode":45});
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":47});
        console.log("user_id,article_id不存在！")
    }
});
//====================================显示用户是否收藏该文章

router.post('/showcollect/insertcollect', function(request, response, next) {
    var article=request.body;
    // console.log(book);
    if(article){
        article_dao.insertcollect(article.user_id,article.article_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectedrows==1) {
                    //说明插入成功
                    response.json({"statusCode":48});
                } else {
                    //插入失败
                    response.json({"statusCode":49});
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":47});
        console.log("user_id,article_id不存在！")
    }
});
//====================================用户点击收藏文章

router.post('/showlove/deletecollect', function(request, response, next) {
    var article=request.body;
    // console.log(book);
    if(article){
        article_dao.deletecollect(article.collect_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectedrows==1) {
                    //说明删除成功
                    response.json({"statusCode":50});
                } else {
                    //删除失败
                    response.json({"statusCode":51});
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":47});
        console.log("user_id,article_id不存在！")
    }
});
//====================================用户点击不收藏该文章




module.exports = router;
