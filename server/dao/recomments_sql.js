exports.sql={
    //==============================书
    //插入对他人的评论(user)
    insertBkRecom:"insert into bkrecomtable(user_id,recom_content,recom_time,bookcom_id) values(?,?,now(),?)",
    //查看他人对自己的评论
    showBkRecom:"call showrecom(?,@result)",

    //=============================文章
    //插入对他人的评论(user)
    insertArtRecom:"insert into artrecomtable(user_id,recom_content,recom_time,artcom_id) values(?,?,now(),?)",
    //查看他人对自己的评论
    showArtRecom:"call showartrecom(?,@result)",

};
