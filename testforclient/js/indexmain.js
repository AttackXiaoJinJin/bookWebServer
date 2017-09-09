$(function () {
    //获取id
   var user_phone=window.sessionStorage.getItem("loginPhone");
   console.log(user_phone);
   var userBar=$("#user_bar");
   if(user_phone){
       var go= '<li>欢迎:<a href="login.html">'+user_phone+'</a></li>';

        userBar.html(go);
    }else{
        var stay= '<li><a href="login.html">登录</a></li>'+
       '<li><a href="regist.html">注册</a></li>';
        userBar.html(stay);
    }
/*
    $.ajax({
        type: 'get',
        url: 'http://localhost:3001/positions',
        dataType: 'json',
        contentType:"application/x-www-form-urlencoded;charset=utf-8",
        success: function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    $("#positionContainer").append(`
                   $(result[i].name) 
                   $(result[i].salary) 
                   $(result[i].city_name) 
                   $(result[i].education) 
                   $(result[i].years_working)
                    `);
                }

            }else if(){
                alert("用户名不存在");
            }else if(){
                alert("用户名或密码错误");
            }
        },
        error: function (err) {
        }
    });*/



});