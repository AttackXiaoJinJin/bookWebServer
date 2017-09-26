var express = require('express');
var router = express.Router();
var message_dao=require("../dao/message_dao").messageDao;

router.post('/sendmessage', function(request, response, next) {
    var phone=request.body.phone;
    message_dao.sendMessage(phone,function (result,error) {
        if(error){
            console.log(error+"短信发送错误");
            response.json(error.message);
        }else{
           // console.log(result);
            response.json(result);
        }

    });



});

//=========================================






//返回Promise

