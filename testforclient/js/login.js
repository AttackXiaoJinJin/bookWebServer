$(function () {
    var phone = $("#login_phone");
    var passwd= $("#login_passwd");
    var login=$("#btn_login");
    phone.blur(function () {
        checkPhone();

    });
    passwd.blur(function () {
        checkPasswd();
    });

    login.click(function () {

      if( checkPasswd() && checkPhone() ){
         // console.log("aaabb");
          $.ajax({
              type: 'post',
              url: 'http://localhost:3001/users/login',
              data: $('#loginForm').serialize(),
              dataType: 'json',
              contentType:"application/x-www-form-urlencoded;charset=utf-8",
              success: function (result) {
                      if(result.statusCode=="1"){
                          //跳转
                          window.sessionStorage.setItem("userPhone",phone.val());
                          // location.href="./index.html";
                          location.href="./uploadimg.html";
                      }else if(result.statusCode=="3"){
                          alert("用户名不存在");
                      }else if(result.statusCode=="2"){
                          alert("用户名或密码错误");
                      }else{
                          location.href="./404.html";
                      }
                  },
              error: function (err) {
              }
          });


      }
    });


});
//======================window.onload

function checkPhone() {
    var phone = $("#login_phone");
    var err_phone = $("#login_err_phone");
    if (phone.val().trim()) {
        var reg = /^1[34578]\d{9}$/;
        if (reg.test(phone.val())) {
            err_phone.html("");
            return true;
        } else {
            err_phone.html("手机号码格式不正确");
            return false;
        }
    } else {
        err_phone.html("手机号不能为空");
        return false;
    }
}
//=======checkPasswd
function checkPasswd() {
    var passwd = $("#login_passwd");
    var err_passwd = $("#login_err_passwd");
    if (passwd.val().trim() && passwd.val().length >=6) {
        err_passwd.html("");
        return true;
    } else {
        err_passwd.html("密码长度至少六位");
        return false;
    }
}
