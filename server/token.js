var jwt=require("jwt-simple");
var moment=require("moment");

//生成token
// var expires=moment().add(7,"days").valueOf();
// var token=jwt.encode({
//     //登录ID
//     iss:'18852995180',
//     exp:expires
//     //私钥
// },'juanjuan');
// console.log(token);

var token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxODg1Mjk5NTE4MCIsImV4cCI6MTUwNjMxMDYzNTczMn0.Hl3C5Qsl5x28GrbqcVAh4VRItWna4k6g_lcrBRmct2o';
//解析token
//公钥和私钥
var decoded=jwt.decode(token,'juanjuan');
 console.log(decoded);

