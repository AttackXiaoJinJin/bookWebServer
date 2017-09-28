var express = require('express');
var router = express.Router();
var receive_dao=require("../dao/receive_dao").receiveDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");


//========================显示所有收货地址
router.post('/showreceive', function(request, response, next) {
    var receive=request.body;
    if(receive){
    receive_dao.showreceive(receive.user_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result.length == 0) {
                //说明获取收货地址失败
                response.json({"statusCode":98});
            } else {
                //获取成功
                // response.json({"statusCode":73});
                response.json(result);
                console.log(JSON.stringify(result));
            }
        }
    });
    }
});

//========================插入收货地址
router.post('/insertreceive', function(request, response, next) {
    var receive=request.body;
    if(receive){
    receive_dao.insertreceive(receive.user_id,receive.receive_name,receive.receive_address,receive.receive_phone,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result.affectRows==0) {
                //说明插入收货地址失败
                response.json({"statusCode":104});
            } else {
                //获取成功
                // response.json({"statusCode":73});
                response.json({"statusCode":103});
                // console.log(JSON.stringify(result));
            }
        }
    });
    }
});

//=======================================修改收货地址
router.post('/updatereceive', function(request, response, next) {
    var receive=request.body;
    if(receive){
    receive_dao.updatereceive(receive.receive_name,receive.receive_address,receive.receive_phone,receive.id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result.affectedRows == 0) {
                //说明修改收货地址失败
                response.json({"statusCode":100});
            } else {
                //获取成功
                response.json({"statusCode":99});
                // response.json(result);
                // console.log(JSON.stringify(result));
            }
        }
    });
    }
});

//=======================================删除收货地址
router.post('/deletereceive', function(request, response, next) {
    var receive=request.body;
    if(receive){
    receive_dao.deletereceive(receive.receive_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result.affectedRows == 0) {
                //说明删除收货地址失败
                response.json({"statusCode":102});
            } else {
                //获取成功
                response.json({"statusCode":101});
                // response.json(result);
                // console.log(JSON.stringify(result));
            }
        }
    });
    }
});

//=======================================通过receive_id获取收货地址
router.post('/showaddress', function(request, response, next) {
    var receive=request.body;
    if(receive){
    receive_dao.showaddress(receive.receive_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (!result[0]) {
                //说明没有收货地址
                response.json({"statusCode":98});
            } else {
                //获取成功
                response.json(result);
                // response.json(result);
                // console.log(JSON.stringify(result));
            }
        }
    });
    }
});

module.exports = router;
