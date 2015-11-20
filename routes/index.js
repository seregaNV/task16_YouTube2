var express = require('express'),
    fs = require('fs'),
    router = express.Router(),
    app = express(),
    YouTube = require('../public/javascripts/youtube'),
    youTubeAPI = new YouTube(),
    results;

youTubeAPI.setKey('AIzaSyBSq2iIy-IfMWsyVaJmZW2_sy2QwNOdb7I');
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Task 16'
    });
});



//youTubeAPI.getPlayListsItemsById('PLsuEohlthXdkRSxJTkmTstWKHgBHsd3Dx', 3, function(error, result) {
//youTubeAPI.getPlayListsById('PLsuEohlthXdkRSxJTkmTstWKHgBHsd3Dx', function(error, result) {
youTubeAPI.getById('ILpS4Fq3lmw', function(error, result) {
//youTubeAPI.search('node js', 10, function(error, result) {
    if (error) {
        console.log(error);
    }
    else {
        //console.log(JSON.stringify(result, null, 2));
        //console.log(result);
        results = JSON.stringify(result, null, 2)
        //results = result;
    }
});
router.get('/youTube', function(req, res, next) {
    res.render('youTube', {
        title: 'YouTub_resp',
        message: results
    });
    fs.open('docs/YouTube_resp.txt', "a+", function(err, file_handle) {
        if (!err) {
            fs.write(file_handle, results + "\r\n", function(err){
                if (!err) {
                    fs.close(file_handle);
                } else {
                    console.log("Write error!");
                }
            });
        } else {
            console.log("Error opening file!");
        }
    });
});
//router.get('/search', function(req, res, next) {
//    res.redirect(url.search);
//});
//
//router.get('/id', function(req, res, next) {
//    res.redirect(url.getById);
//});
//
//router.get('/playlist', function(req, res, next) {
//    res.redirect(url.getPlayListsById);
//});
//
//router.get('/playlistitem', function(req, res, next) {
//    res.redirect(url.getPlayListsItemsById);
//});

router.use(function(req, res) {
    console.error('Page not found');
    throw new Error('Page not found');
});

router.use(function(err, req, res, next) {
    if (app.get('env') == 'development') {
        res.status(500).render('error', {
            title: 'Error page',
            message: err.message,
            stack: err.stack
        });
    } else {
        res.status(404).send('Page not found');
    }
});

module.exports = router;