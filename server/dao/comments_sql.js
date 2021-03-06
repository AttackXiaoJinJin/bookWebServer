exports.sql={
    //插入用户对书的评论
    insertBookComments:"insert into bookcomtable(bookcom_content,user_id,book_id,bookcom_time,like_num) values(?,?,?,now(),0)",
    //插入用户对文章的评论
    insertArticleComments:"insert into articlecomtable(articlecom_content,article_id,user_id,articlecom_time,like_num) values(?,?,?,now(),0)",
    //显示某本书的评论(按发表时间排序)
    showBookComs:"call showBookComs(?,@result)",
    //显示某个文章的评论(按发表时间排序)
    showArticleComs:"call showArticleComs(?,@result)",
    // showArticleComs:"call showArticleComs(?,@result)",
    //给一本书的评论点赞(like_num+1),
    // 疑问;如何找到bookcom_id
    //暂时没有判断让user只能点一次赞
    bookcomlike:"update bookcomtable set like_num=like_num+1 where bookcom_id=?",
    //给一篇文章的评论点赞
    articlecomlike:"update articlecomtable set like_num=like_num+1 where articlecom_id=?",
    //评论的回复功能,待定

};