exports.sql={
    //用户查看自己的订单
    showOrder:"select order_id,book_name,order_time,order_num,order_bianhao from ordertable left join booktable on booktable.book_id=ordertable.book_id where ordertable.user_id=?",
    //用户插入订单
    insertOrder:"insert into ordertable(user_id,book_id,order_time,order_num,order_bianhao) values(?,?,now(),?,?)",
    //用户删除订单
    deleteOrder:"delete from ordertable where order_id=?",


};

