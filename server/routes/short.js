var express = require('express');
var router = express.Router();
var short_dao=require("../dao/short_dao").shortDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");

//==============================根据book_id获取短评（喜欢数）
router.post('/allshorts', function(request, response, next) {
    var short=request.body;
    // console.log(short);
    if(short){
    short_dao.getAllShorts(short.book_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result[0].length == 0) {
                response.json({"statusCode":107});
            } else {
                //获取成功
                response.json(result[0]);
                // console.log(JSON.stringify(result));
            }
        }
    });
    }
});

//==============================根据book_id获取短评（时间）
router.post('/shortstime', function(request, response, next) {
    var short=request.body;
    // console.log(short);
    if(short){
    short_dao.getAllShortsByTime(short.book_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result[0].length == 0) {
                response.json({"statusCode":108});
            } else {
                //获取成功
                response.json(result[0]);

                // console.log(JSON.stringify(result));
            }
        }
    });
    }
});

//==============================插入短评
router.post('/insertshort', function(request, response, next) {
    var short=request.body;
    // console.log(short);
    if(short){
        short_dao.insertShort(short.short_content,short.short_title,short.user_id,short.book_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectRows==1) {
                    response.json({"statusCode":109});
                } else {
                    //获取成功
                    response.json({"statusCode":110});
                    // console.log(JSON.stringify(result));
                }
            }
        });
    }
});

//=========================喜欢短评
router.post('/likeshort',function(request, response, next) {
    var short=request.body;
    if(short){
        if(short.short_id){
            short_dao.likeShort(short.short_id,function (result) {
                if(result=="e004"){
                    response.json({"statusCode":result});
                }else if(result){
                    // console.log(JSON.stringify(result));
                    //成功
                    response.json({"statusCode":112});
                }else {
                    //失败
                    response.json({"statusCode":113});
                }
            });
        }else{
            response.json({"statusCode":111});
        }
    }else {
        console.log("无法获取页面信息！")
    }

});


//=========================讨厌短评
router.post('/dislikeshort',function(request, response, next) {
    var short=request.body;
    if(short){
        if(short.short_id){
            short_dao.dislikeShort(short.short_id,function (result) {
                if(result=="e004"){
                    response.json({"statusCode":result});
                }else if(result){
                    // console.log(JSON.stringify(result));
                    //成功
                    response.json({"statusCode":114});
                }else {
                    //失败
                    response.json({"statusCode":115});
                }
            });
        }else{
            response.json({"statusCode":111});
        }
    }else {
        console.log("无法获取页面信息！")
    }

});

//====================搜索短评
router.post('/searchshort', function(request, response, next) {
    var short=request.body;
    // console.log(book);
    if(short){
        short_dao.searchShort(short.searchCon,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result[0].length==0) {
                    //说明搜索没有结果
                    response.json({"statusCode":116});
                } else {
                    response.json(result[0]);
                }
            }
        });
    }
    else {
        response.json({"statusCode":89});
        console.log("未输入搜索内容")
    }
});

//==============================插入短评
router.post('/shortdetail', function(request, response, next) {
    var short=request.body;
    // console.log(short);
    if(short){
        short_dao.shortDetail(short.short_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result[0].length==0) {
                    response.json({"statusCode":117});
                } else {
                    //获取成功
                    response.json(result[0][0]);
                    // console.log(JSON.stringify(result));
                }
            }
        });
    }
});




module.exports = router;
