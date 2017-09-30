var express = require('express');
var router = express.Router();
var bkrecom_dao=require("../dao/bkrecom_dao").bkrecomDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");

//=============================插入回复
router.post('/insertrecom', function(request, response, next) {
    var recom=request.body;
    console.log(recom);
    if(recom){
    bkrecom_dao.insertBkRecom(recom.user_id,recom.recom_content,recom.bookcom_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result.affectedRows==1) {
                response.json({"statusCode":118});
            } else {
                response.json({"statusCode":119});
            }
        }
    });
    }
});

//=============================查看回复
router.post('/showrecom', function(request, response, next) {
    var recom=request.body;
    console.log(recom);
    if(recom){
    bkrecom_dao.showBkRecom(recom.user_id,function (result) {
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


module.exports = router;
