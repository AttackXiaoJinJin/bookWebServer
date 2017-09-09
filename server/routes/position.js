var express = require('express');
var router = express.Router();
var positionDao=require("./../dao/position_dao").positionDao;


router.get('/', function(req, res, next) {
    positionDao.getAllPositions(function (result) {
        if(result.length==0){
            res.json(null);
        }else{
            res.json(result);
        }
    })
});

module.exports = router;
