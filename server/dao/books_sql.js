exports.sql={
    //获取所有图书全部信息
    getAllBooks:"select book_id,book_name,book_subhead,book_price,book_content,writer_id,book_catalog,book_img,book_year from booktable",
    //获取推荐书籍
    // getAlllove:""
    //获取推荐书籍(按评论数排序)
    getMostComBooks:"select count(1) book_com,booktable.book_id,book_name,book_img,writer_name,book_year from booktable join bookcomtable on booktable.book_id=bookcomtable.book_id join writertable on booktable.writer_id=writertable.writer_id group by book_id ORDER BY count(1) desc",
    //获取书的详情
    getBookDetail:"select book_name,book_subhead,book_price,book_content,writer_id,book_catalog,book_img,book_year from booktable where book_id=?",


};