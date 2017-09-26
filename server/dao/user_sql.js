exports.sql={
    //获取用户ID
    getUserIdByPhone:"select user_id from userTable where user_phone=?",
    //登录,获取用户密码和ID
    getPasswdByPhone:"select user_passwd,user_id from userTable where user_phone=?",
    //注册,获取用户密码和id
    addUser:"insert into userTable(user_phone,user_name,user_head,user_passwd) values(?,?,?,?)",
    //创建令牌
    createToken:"update userTable set token=? where user_phone=?",
    //获取用户头像
    getUserHead:"select user_head from usertable where user_id=?",
    //添加用户头像
    addUserHead:"call addUserHead(?,?,@result)",
    //根据用户id获取头像、昵称、手机号
    getBasicInfo:"select user_name,user_phone,user_head,user_introduction,user_address,coll_num,att_num,love_num from usertable left join (select count(1) coll_num,user_id from collecttable GROUP BY user_id) coll on coll.user_id=usertable.user_id left join (select count(1) att_num,user_id from attenttable GROUP BY user_id) att on att.user_id=usertable.user_id left join (select count(1) love_num,user_id from lovetable GROUP BY user_id) love on love.user_id=usertable.user_id where usertable.user_id=?",
    //根据用户id获取头像、昵称、手机号、个人简介、收货地址
    getmoreBasicInfo:"select user_name,user_phone,user_head,user_introduction,user_address from usertable where user_id=?",
    //根据用户id获取其关注话题
    getUserTopic:"call getUserTopic(?,@result)",
    //根据用户id获取其收藏文章
    getUserArticle:"call getUserArticle(?,@result)",
    //根据用户id获取其喜欢书籍
    getUserBook:"call getUserBook(?,@result)",
    //显示用户自己写的文章(按时间)
    showUserPublish:"call showUserPublish(?,@result)",
    //显示用户自己写的文章(按收藏数)
    showUserPubColl:"call showUserPubColl(?,@result)",




};