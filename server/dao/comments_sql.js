exports.sql={
    //插入用户对书的评论
    insertBookComments:"insert into bookcomtable(bookcom_content,user_id,book_id,bookcom_time,like_num) values(?,?,?,now(),0)",
    //插入用户对文章的评论
    insertArticleComments:"insert into articlecomtable(articlecom_content,article_id,user_id,articlecom_time,like_num) values(?,?,?,now(),0)",
    //显示某本书的评论
    showBookComs:"select bookcom_content,user_name,bookcomtable.user_id,book_id,bookcom_time,like_num from bookcomtable join usertable on bookcomtable.user_id=usertable.user_id where book_id=?",
    //显示某个文章的评论
    showArticleComs:"select articlecom_content,user_name,articlecomtable.user_id,article_id,articlecom_time,like_num from articlecomtable join usertable on articlecomtable.user_id=usertable.user_id where article_id=?",




};