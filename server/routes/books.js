var express = require('express');
var router = express.Router();
var booksDao=require("../dao/books_dao").booksDao;


router.get('/', function(req, res, next) {
    booksDao.getAllBooks(function (result) {
        if(result.length==0){
            res.json(null);
        }else{
            res.json(result);
        }
    })
});

module.exports = router;
