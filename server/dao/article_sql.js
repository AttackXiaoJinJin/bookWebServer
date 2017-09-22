exports.sql={
    //在全部文章中获取推荐文章(按评论数排序)
    getMostComArticle:"call getMostComArticle",
    //获取一篇文章的详情
    getArticleDetail:"call getArticleDetail(?,@result)",
    //用户插入文章(user)
    insertArticle:"insert into articletable(user_id,article_time,topic_id,article_content,article_title) values(?,now(),?,?,?)",
    //收藏文章(显示爱心)利用user_id,article_id遍历collect表,如果表中有collect_id，则表示该文章被该用户收藏,否则没有
    showcollect:"select collect_id from collecttable where user_id=? and article_id=?",
    //如果collect表中没有,则用户点击'收藏',向collection表中插入(载入页面就已经执行showcollection确认了,是否需要再次确认?)
    insertcollect:"insert into collecttable(user_id,article_id) VALUES (?,?)",
    //如果collect表中有,则用户点击'收藏',从collect表中删除(载入页面就已经执行showcollect确认了,是否需要再次确认?)
    deletecollect:"delete from collecttable where user_id=? and article_id=?",
    //搜索文章
    searchArticle:"call searchArticle(?,@result)",
    

};