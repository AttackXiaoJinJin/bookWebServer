exports.sql={
    //==============================书
    //插入对他人的评论(user)
    insertBkRecom:"insert into bkrecomtable(user_id,recom_content,recom_time,bookcom_id,new) values(?,?,now(),?,0)",

    //一本书下查看回复
    showBkRecom:"call showrecom(?,@result)",
    //用户头像显示回复的条数
    userbknum:"call userbknum(?,@result)",

    //=============================文章
    //插入对他人的评论(user)
    insertArtRecom:"insert into artrecomtable(user_id,recom_content,recom_time,artcom_id) values(?,?,now(),?)",
    //文章下查看回复
    showArtRecom:"call showartrecom(?,@result)",

};
