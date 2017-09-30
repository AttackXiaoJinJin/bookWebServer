var express = require('express');
var router = express.Router();
var artrecom_dao=require("../dao/artrecom_dao").artrecomDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");

//=============================插入回复
router.post('/insertartrecom', function(request, response, next) {
    var recom=request.body;
    console.log(recom);
    if(recom){
    artrecom_dao.insertArtRecom(recom.user_id,recom.recom_content,recom.artcom_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result.affectedRows==1) {
                response.json({"statusCode":121});
            } else {
                response.json({"statusCode":122});
            }
        }
    });
    }
});

//=============================查看回复
router.post('/showartrecom', function(request, response, next) {
    var recom=request.body;
    console.log(recom);
    if(recom){
    artrecom_dao.showArtRecom(recom.user_id,function (result) {
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
