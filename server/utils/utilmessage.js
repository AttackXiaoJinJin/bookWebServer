var SMS = require('aliyun-sms-node');
var sms = new SMS({
    AccessKeyId: '',
    AccessKeySecret: ''
});
//随机产生六位数验证码
var range=function(start,end)
{
    var array=[];
    for(var i=start;i<end;++i) array.push(i);
    return array;
};
exports.sendmessage=function (req,res,next) {
    var phone=req.body.phone;
    var randomstr = range(0,6).map(function(x){
        return Math.floor(Math.random()*10);
    }).join('');
    console.log(randomstr);

    sms.send({
        Format: 'JSON',
        Action: 'SendSms',
        TemplateParam: '{"code":'+randomstr+'}',
        PhoneNumbers: phone+'',
        SignName: '小巨人友书网站',
        TemplateCode: 'SMS_99990009'
    });
    res.json({"yanzheng":randomstr})

};
