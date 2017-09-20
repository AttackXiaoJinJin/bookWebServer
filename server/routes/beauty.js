var express = require('express');
var router = express.Router();
var beauty_dao=require("../dao/beauty_dao").beautyDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");



router.post('/getbeauty', function(request, response, next) {
    var beauty=request.body;
    console.log(beauty);
    if(beauty){
    beauty_dao.getBeauty(beauty.book_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result[0].length == 0) {
                //说明获取美句失败
                response.json({"statusCode":74});
            } else {
                //获取成功
                // response.json({"statusCode":73});
                response.json(result);
                console.log(JSON.stringify(result));
            }
        }
    });
    }
    else {
        response.json({"statusCode":40});
        console.log("获取美句的book_id不存在！")
    }
});
//==============================上面是根据book_id获取美句

module.exports = router;
