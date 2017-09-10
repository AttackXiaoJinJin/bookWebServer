exports.sql={
    //登录
    getPasswdByPhone:"select user_passwd from userTable where user_phone=?",
    //注册
    addUser:"insert into userTable(user_phone,user_name,user_head,user_passwd) values(?,?,?,?)",
    //创建令牌
    createToken:"update userTable set token=? where user_phone=?",
    //获取用户头像
    getUserHead:"select user_head from userTable where user_phone=?",
    //添加用户头像
    addUserHead:"call addUserHead(?,?,@result)"


};