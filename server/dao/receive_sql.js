exports.sql={
    //根据user_id显示所有收货地址
    showreceive:"select receive_id,receive_name,receive_address,receive_phone from receivetable where user_id=?",
    //增加收货地址
    insertreceive:"insert into receivetable(user_id,receive_name,receive_address,receive_phone) VALUES (?,?,?,?)",
    //修改收货地址
    updatereceive:"update receivetable set receive_name=?,receive_address=?,receive_phone=? where receive_id=?",
    //删除收货地址
    deletereceive:"delete from receivetable where receive_id=?",
    //通过receiv_id获取收货地址
    showaddress:"select receive_address,receive_phone,receive_name from receivetable where receive_id=?",





};


