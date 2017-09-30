exports.sql={
    //获取该图书的全部短评(默认是like_num排序)
    getAllShorts:"call getAllShorts(?,@result)",
    //获取该图书的全部短评(发布时间排序)
    getAllShortsByTime:"call getAllShortsByTime(?,@result)",
    //插入短评(user)
    insertShort:"insert into shorttable(short_content,short_title,user_id,book_id,short_time,like_num,dislike_num) values(?,?,?,?,now(),0,0)",
    //喜欢短评
    likeShort:"update shorttable set like_num=like_num+1 where short_id=?",
    //讨厌短评
    dislikeShort:"update shorttable set dislike_num=dislike_num+1 where short_id=?",
    //搜索短评
    searchShort:"call searchShort(?,@result)",
    //短评详情
    shortDetail:"call shortdetail(?,@result)",

};