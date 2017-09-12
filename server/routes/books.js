var express = require('express');
var router = express.Router();
var book_dao=require("../dao/books_dao").booksDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");


router.post('/allbooks',function(request, response, next) {

        book_dao.getAllBooks(function (result) {
            if(result=="e004"){
                response.json({"statusCode":result});
            }else if(result){
                    response.json({"statusCode":12});
                }else {
                    response.json({"statusCode":13});
                }
        })
    });
        //============上面是获取全部图书全部信息

router.post('/mostcombooks', function(request, response, next) {

    book_dao.getMostComBooks(function (result) {
        if (result == "e004") {
            response.json({"statusCode": result});
        } else {
            if (result){response.json({"statusCode": 14});console.log(JSON.stringify(result))}
            else {response.json({"statusCode": 15});}
        }
        });
});
//=======================上面是根据评论数获取推荐的书

router.post('/getbookdetail', function(request, response, next) {
    var book=request.body;
    console.log(book);
    if(book){
    book_dao.getBookDetail(book.book_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result.length == 0) {
                //说明获取详情页失败
                response.json({"statusCode":17});
            } else {
                //获取成功
                response.json({"statusCode":16});
            }
        }
    });
    }
    else {
        response.json({"statusCode":18});
        console.log("获取书详情的书id不存在！")
    }
});
//==============================上面是获取某一个书的详情



//==========================显示书籍
module.exports = router;
