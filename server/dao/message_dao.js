var SMS = require('aliyun-sms-node');
var sms = new SMS({
    AccessKeyId: '',
    AccessKeySecret: ''
});

exports.sendmessageDao={
    sendMessage:function (phone,callback) {
        let that=this;
        //随机产生六位数验证码
        let range=function(start,end)
        {
            let array=[];
            for(let i=start;i<end;++i) array.push(i);
            return array;
        };
        let randomstr = range(0,6).map(function(x){
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
        callback(randomstr);

    },

};
