exports.sql={
    //获取所有图书全部信息
    getAllBooks:"  select book_id,book_name,book_subhead,book_price,book_content,book_tag,booktable.writer_id,writer_name,book_catalog,book_img,book_year from booktable LEFT JOIN writertable on writertable.writer_id=booktable.writer_id",
    //获取推荐书籍(按喜欢数排序)
    // getMostComBooks:"select book_com,booktable.book_id,book_name,book_img,writer_name,book_year from booktable left join (select count(1) book_com,book_id from bookcomtable group by book_id)bkcom on booktable.book_id=bkcom.book_id left join writertable on booktable.writer_id=writertable.writer_id group by book_id ORDER BY count(1) desc",
    getMostComBooks:"select love_num,booktable.book_id,book_name,book_img,writer_name,book_year from booktable left join (select count(1) love_num,book_id from lovetable group by book_id)lot on booktable.book_id=lot.book_id left join writertable on booktable.writer_id=writertable.writer_id group by book_id ORDER BY love_num desc",
    //获取书的详情
    getBookDetail:"select book_tag,book_name,book_subhead,book_price,book_content,writertable.writer_id,book_catalog,book_img,book_year,writer_name,writer_content from booktable left join writertable ON writertable.writer_id=booktable.writer_id where book_id=?",
    //按照书籍标签来分类书
    classBookByTag:"select book_id,book_name,book_img,writer_name,book_year,book_tag from booktable join writertable on booktable.writer_id=writertable.writer_id where book_tag=?",
    //插入图书(admin)
    inserBook:"insert into booktable(book_name,book_subhead,book_price,book_content,writer_id,book_tag,book_catalog,book_img,book_year) values(?,?,?,?,?,?,?,?,?)",
    //(显示爱心)利用user_id,book_id遍历love表,如果表中有love_id，则表示该书被该用户喜欢,否则没有
    showlove:"select love_id from lovetable where user_id=? and book_id=?",
    //如果love表中没有,则用户点击'喜欢',向love表中插入(载入页面就已经执行showlove确认了,是否需要再次确认?)
    insertlove:"insert into lovetable(user_id,book_id,love_time) VALUES (?,?,now())",
    //如果love表中有,则用户点击'喜欢',从love表中删除(载入页面就已经执行showlove确认了,是否需要再次确认?)
    deletelove:"delete from lovetable where user_id=? and book_id=?",
    //搜索书籍
    searchBook:"call searchBook(?,@result)",

    //加载3本书籍
    threebooks:"call threebooks(?,?)",

};