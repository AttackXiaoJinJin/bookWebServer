exports.sql={
    //在全部文章中获取推荐文章(按评论数排序)
    getMostComArticle:"call getMostComArticle",
    //获取一篇文章的详情
    getArticleDetail:"call getArticleDetail(?,@result)",
    //用户插入文章(user,包括图片)
    insertArticle:"insert into articletable(article_img,user_id,topic_id,article_content,article_title,article_time) values(?,?,?,?,?,now())",
    //收藏文章(显示爱心)利用user_id,article_id遍历collect表,如果表中有collect_id，则表示该文章被该用户收藏,否则没有
    showcollect:"select collect_id from collecttable where user_id=? and article_id=?",
    //如果collect表中没有,则用户点击'收藏',向collection表中插入(载入页面就已经执行showcollection确认了,是否需要再次确认?)
    insertcollect:"insert into collecttable(user_id,article_id,collect_time) VALUES (?,?,now())",
    //如果collect表中有,则用户点击'收藏',从collect表中删除(载入页面就已经执行showcollect确认了,是否需要再次确认?)
    deletecollect:"delete from collecttable where user_id=? and article_id=?",
    //搜索文章
    searchArticle:"call searchArticle(?,@result)",
    //显示收藏数
    showcollnum:"select count(1) coll_num,article_id from collecttable where article_id=? group by article_id",
    //插入文章图片
    // addArtImg:"update articletable set article_img=? where article_id=?",


    //评论最多的三篇文章
    threecomart:"call threecomart(?,?)",
    //推荐三篇文章
    threecolart:"call threecolart(?,?)",


};