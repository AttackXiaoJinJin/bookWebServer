exports.sql={
    //用户查看自己的订单
    showOrder:"select order_id,receive_address,book_name,order_time,order_num,order_bianhao,book_img,book_price from ordertable left join booktable on booktable.book_id=ordertable.book_id left join receivetable on receivetable.receive_id=ordertable.receive_id where ordertable.user_id=? order by order_time desc",
    //用户插入订单
    insertOrder:"insert into ordertable(user_id,book_id,order_time,order_num,order_bianhao,receive_id) values(?,?,now(),?,?,?)",
    //用户删除订单
    deleteOrder:"delete from ordertable where order_id=?",


};

