
var jwt=require("jwt-simple");
var util=require("../utils/util");

exports.checkToken=function (req,res,next) {
var token=req.header("token")|| req.query.token||req.body.token;
try{
    var decoded=jwt.decode(token,util.secret);
    //console.log(decoded);
    //判断是否过期
    if(decoded.exp>=new Date().valueOf()){
        //如果成功执行next()
        next();
    }else{
        res.json({"statusCode":22222})
    }

    }catch (e){
    console.log("出现错误"+e.message);
    res.json({"statusCode":22222})
    }

};
