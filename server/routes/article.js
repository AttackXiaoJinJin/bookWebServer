var express = require('express');
var router = express.Router();
var article_dao=require("../dao/article_dao").articleDao;
var util=require("../utils/util");
var formidable=require("formidable");
var AVATARUPLOAD_FOLDER="/articleimages/";
var fs=require("fs");

router.post('/mostcomarticles', function(request, response, next) {

    article_dao.getMostComArticle(function (result) {
        if (result == "e004") {
            response.json({"statusCode": result});
        } else {
            if (result){
                // response.json({"statusCode": 52});
                response.json(result);
            console.log(JSON.stringify(result))}
            else {response.json({"statusCode": 53});}
        }
        });
});
//=======================上面是根据评论数获取推荐的文章

router.post('/articledetail', function(request, response, next) {
    var article=request.body;
    console.log(article);
    if(article){
    article_dao.getArticleDetail(article.article_id,function (result) {
        if (result == "e004") {response.json({"statusCode": result});}
        else  {
            if (result[0].length == 0) {
                //说明获取详情页失败
                response.json({"statusCode":55});
            } else {
                //获取成功
                // response.json({"statusCode":54});
                response.json(result);
                console.log(JSON.stringify(result));
            }
        }
    });
    }
    else {
        response.json({"statusCode":56});
        console.log("获取文章详情的文章id不存在！")
    }
});
//==============================上面是获取某一个文章的详情


//========================插入文章(用户),是否需要先检查文章名是否重复?
// router.post('/insertarticle', function(request, response, next) {
//     var article=request.body;
//     console.log(article);
//     if(article) {
//         article_dao.insertArticle(article.user_id, article.topic_id, article.article_content, article.article_title, function (result) {
//         // article_dao.insertArticle(user_id, topic_id, article_content, article_title, function (result) {
//             if (result == "e004") {
//                 response.json({"statusCode": result});
//             }
//             else {
//                 if (result.affectedRows == 1) {
//                     //说明发表文章成功
//                     response.json({"statusCode": 8});
//                 } else {
//                     //发表失败
//                     response.json({"statusCode": 9});
//                     console.log(JSON.stringify(result));
//                 }
//             }
//         });
//     }
// });
//========================插入文章(用户),是否需要先检查文章名是否重复?

//===================================================插入文章
router.post('/insertarticle', function(request, response, next) {
    var article=request.body;
    var form=new formidable.IncomingForm();
    //由于Node.js安装的盘符和写的地方不在一个盘符，跨目录重命名文件导致的问题。
    // 重设临时上传路径
    form.uploadDir = "./tmp";
    form.encoding="utf-8";
    form.parse(request,function (err,fields,files) {
        if(err){
            response.locals.error=err;
            response.send("upload error");
            return;
        }
        //后缀名
        var extName='';
        //input name:uploadFile
        console.log(files.uploadFile.type+"图片格式是");
        switch (files.uploadFile.type){
            case 'image/jpeg':extName='jpeg';break;
            case 'image/jpg':extName='jpg';break;
            case 'image/png':extName='png';break;
            case 'image/x-png':extName='png';break;
        }
        if(extName.length==0){
            //图片格式不正确
            response.json({"statusCode":"e005"});
            return;
        }else {
            form.uploadDir = '../public' + AVATARUPLOAD_FOLDER;
            form.keepExtensions = true;
            //图片大小不超过5兆
            form.maxFieldsSize = 5 * 1024;
            var avatarName = util.createUnique() + '.' + extName;
            //'public/upload/d233452.jpg'
            //    1      2       3
            var newPath = form.uploadDir + avatarName;
            //  重命名      用户上传的文件路径,服务器自己创建的路径
            // fs.renameSync(files.uploadFile.path,newPath);
            fs.rename(files.uploadFile.path, newPath, function (error) {
                if (error) {
                    response.json({"stateCode": 'e005'});
                    return;
                }
                console.log(article);
                if (article) {
                    article_dao.insertArticle(article.user_id, article.topic_id, article.article_content, article.article_title,avatarName, function (result) {
                        // article_dao.insertArticle(user_id, topic_id, article_content, article_title, function (result) {
                        if (result == "e004") {
                            response.json({"statusCode": result});
                        }
                        else {
                            if (result.affectedRows == 1) {
                                //说明发表文章成功
                                response.json({"statusCode": 8});
                            } else {
                                //发表失败
                                response.json({"statusCode": 9});
                                console.log(JSON.stringify(result));
                            }
                        }
                    });
                }
            });
        }
    })
});




//================================显示文章的collect数并递减排序


//====================================显示用户是否收藏该文章
router.post('/showcollect', function(request, response, next) {
    var article=request.body;
    // console.log(book);
    if(article){
        article_dao.showcollect(article.user_id,article.article_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.length == 0) {
                    //说明没找到collect_id
                    response.json({"statusCode":46});
                } else {
                    //获取成功
                    response.json({"statusCode":45});
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":47});
        console.log("user_id,article_id不存在！")
    }
});


router.post('/showcollect/insertcollect', function(request, response, next) {
    var article=request.body;
    // console.log(book);
    if(article){
        article_dao.insertcollect(article.user_id,article.article_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectedRows==1) {
                    //说明插入成功
                    response.json({"statusCode":48});
                } else {
                    //插入失败
                    response.json({"statusCode":49});
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":47});
        console.log("user_id,article_id不存在！")
    }
});
//====================================用户点击收藏文章

router.post('/showcollect/deletecollect', function(request, response, next) {
    var article=request.body;
    // console.log(book);
    if(article){
        article_dao.deletecollect(article.user_id,article.article_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.affectedRows==1) {
                    //说明删除成功
                    response.json({"statusCode":50});
                } else {
                    //删除失败
                    response.json({"statusCode":51});
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":47});
        console.log("user_id,article_id不存在！")
    }
});
//==================================================用户点击不收藏该文章

router.post('/searcharticle', function(request, response, next) {
    var search=request.body;
    // console.log(book);
    if(search){
        article_dao.searchArticle(search.searchCon,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result[0].length==0) {
                    //说明搜索结果为0
                    response.json({"statusCode":86});
                } else {
                    //得出结果
                    response.json(result);
                    console.log(JSON.stringify(result));
                }
            }
        });
    }
    else {
        response.json({"statusCode":89});
        console.log("请输入搜索内容！")
    }
});
//============================================================================搜索文章

router.post('/showcollnum', function(request, response, next) {
    var article=request.body;
    if(article){
        article_dao.showcollnum(article.article_id,function (result) {
            if (result == "e004") {response.json({"statusCode": result});}
            else  {
                if (result.length) {
                    response.json(result);
                    console.log(JSON.stringify(result));
                } else {
                    response.json({"statusCode":95 });

                }
            }
        });
    }
});
//=========================================================================显示收藏数


//========================================================================上传文章封面
// router.post('/addartimg', function(request, response, next) {
//     var article=request.body;
//     var form=new formidable.IncomingForm();
//     //由于Node.js安装的盘符和写的地方不在一个盘符，跨目录重命名文件导致的问题。
//     // 重设临时上传路径
//     form.uploadDir = "./tmp";
//     form.encoding="utf-8";
//     form.parse(request,function (err,fields,files) {
//         if(err){
//             response.locals.error=err;
//             response.send("upload error");
//             return;
//         }
//         //后缀名
//         var extName='';
//         //input name:uploadFile
//         console.log(files.uploadFile.type+"图片格式是");
//         switch (files.uploadFile.type){
//             case 'image/jpeg':extName='jpeg';break;
//             case 'image/jpg':extName='jpg';break;
//             case 'image/png':extName='png';break;
//             case 'image/x-png':extName='png';break;
//         }
//         if(extName.length==0){
//             //图片格式不正确
//             response.json({"statusCode":"e005"});
//             return;
//         }else {
//             form.uploadDir='../public'+AVATARUPLOAD_FOLDER;
//             form.keepExtensions=true;
//             //图片大小不超过5兆
//             form.maxFieldsSize=5*1024;
//             var avatarName=util.createUnique()+'.'+extName;
//             //'public/upload/d233452.jpg'
//             //    1      2       3
//             var newPath=form.uploadDir+avatarName;
//             //  重命名      用户上传的文件路径,服务器自己创建的路径
//             // fs.renameSync(files.uploadFile.path,newPath);
//             fs.rename(files.uploadFile.path,newPath,function (error) {
//                 if(error){
//                     response.json({"stateCode":'e005'});
//                     return;
//                 }
//                 //=========================sql
//                 article_dao.addArtImg(avatarName,article.article_id,function (result) {
//                     //console.log(result+" this is users");
//                     if(result==1){
//                         response.json({"statusCode":96});
//                     }else{
//                         response.json({"statusCode":97})
//                     }
//                 });
//             //    ==============================
//             });
//         }
//     })
// });


//上传图片
// router.post('/upload',function(req,res){
//     var imgData = req.body.url;
//     var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
//     var dataBuffer = new Buffer(base64Data, 'base64');
//     fs.writeFile("image.png", dataBuffer, function(err) {
//         if(err){
//             res.send(err);
//         }else{
//             res.send("保存成功！");
//         }
//     });
// });





module.exports = router;
