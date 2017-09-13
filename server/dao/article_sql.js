exports.sql={

    //获取推荐文章(按评论数排序)
    getMostComArticles:"",
    //获取文章的详情
    getBookDetail:"select book_name,book_subhead,book_price,book_content,writer_id,book_catalog,book_img,book_year from booktable where book_id=?",
    //按照话题来分类书
    classBookByTag:"select book_id,book_name,book_img,writer_name,book_year,book_tag from booktable join writertable on booktable.writer_id=writertable.writer_id where book_tag=?",
    //插入文章(user)
    inserArticle:"insert into booktable(book_name,book_subhead,book_price,book_content,writer_id,book_tag,book_catalog,book_img,book_year) values(?,?,?,?,?,?,?,?,?)",
    //(显示爱心)利用user_id,book_id遍历love表,如果表中有love_id，则表示该书被该用户收藏,否则没有
    showlove:"select love_id from lovetable where book_id=? and user_id=?",
    //如果love表中没有,则用户点击'喜欢',向love表中插入(载入页面就已经执行showlove确认了,是否需要再次确认?)
    insertlove:"insert into lovetable(user_id,book_id) VALUES (?,?)",
    //如果love表中有,则用户点击'喜欢',从love表中删除(载入页面就已经执行showlove确认了,是否需要再次确认?)
    deletelove:"delete from lovetable where love_id=?",



};