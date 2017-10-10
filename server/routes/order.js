var express = require('express');
var router = express.Router();
var order_dao=require("../dao/order_dao").orderDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/upload/";
var fs=require("fs");

//==============================根据user_id获取订单
router.post('/showorder', function(request, response, next) {
    var order=request.body;
    if(order){
    order_dao.showOrder(order.user_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result.length==0) {
                //说明该用户没有订单
                response.json({"statusCode":90});
            } else {
                //获取成功
                response.json(result);
                console.log(JSON.stringify(result));
            }
        }
    });
    }
    else {
        response.json({"statusCode":3});
        console.log("用户名不存在")
    }
});


//=============================增加订单
router.post('/addorder', function(request, response, next) {
    var order=request.body;
    if(order){
        order_dao.insertOrder(order.user_id,order.book_id,order.order_num,order.order_bianhao,order.receive_name,order.receive_address,order.receive_phone,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectedRows==1) {
                    //说明插入成功
                    response.json({"statusCode":91});
                } else {
                    //插入失败
                    response.json({"statusCode":92});
                }
            }
        });
    }
    else {
        response.json({"statusCode":"缺少参数"});
    }
});


//==============================删除订单
router.post('/deleteorder', function(request, response, next) {
    var order=request.body;
    if(order){
        order_dao.deleteOrder(order.order_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectedRows==1) {
                    //说明删除成功
                    response.json({"statusCode":93});
                } else {
                    //插入失败
                    response.json({"statusCode":94});
                }
            }
        });
    }
    else {
        response.json({"statusCode":"缺少参数"});
    }
});

//==============================根据order_id获取订单
router.post('/showorderbyid', function(request, response, next) {
    var order=request.body;
    if(order){
        order_dao.showOrderById(order.order_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.length==0) {
                    //说明没有该订单
                    response.json({"statusCode":128});
                } else {
                    //获取成功
                    response.json(result);
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
});



module.exports = router;
