exports.sql={
    //获取用户ID
    getUserIdByPhone:"select user_id from userTable where user_phone=?",
    //登录,获取用户密码
    getPasswdByPhone:"select user_passwd from userTable where user_phone=?",
    //注册,获取用户密码和id
    addUser:"insert into userTable(user_phone,user_name,user_head,user_passwd) values(?,?,?,?)",
    //创建令牌
    createToken:"update userTable set token=? where user_phone=?",
    //获取用户头像
    getUserHead:"select user_head from userTable where user_phone=?",
    //添加用户头像
    addUserHead:"call addUserHead(?,?,@result)",
    //用户发表文章
    publishArticle:"insert into articletable(user_id,article_time,topic_id,article_content,article_title) values(?,?,?,?,?)"


};