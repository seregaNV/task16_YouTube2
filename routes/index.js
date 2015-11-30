var express = require('express'),
    router = express.Router(),
    YouTube = require('../scripts/youtube'),
    youTubeAPI = new YouTube(),
    keyAPI;

router.get('/', function(req, res, next) {
    var keywords,
        videoId,
        playlistId,
        quantityResults,
        results;

    keyAPI = req.query.setKey;
    youTubeAPI.setKey(keyAPI);
    keywords = req.query.keywords;
    videoId = req.query.videoId;
    playlistId = req.query.playlistId;
    quantityResults = req.query.maxResults;
    if (quantityResults == "") quantityResults = 5;
    if (keyAPI == "") {
        console.error('You have not entered the Key.');
        throw new Error('You have not entered the Key.');
    } else if ((keywords && videoId) || (videoId && playlistId) || (keywords && playlistId)) {
        console.error('You must fill in only one field of: "Keywords", "Video ID" or "Playlist ID".');
        throw new Error('You must fill in only one field of: "Keywords", "Video ID" or "Playlist ID".');
    } else if (keywords) {
        youTubeAPI.search(keywords, quantityResults, function(error, result) {
            if (youTubeAPI.statusCode == 400) {
                results = JSON.stringify(error, null, 2);
                console.log(results);
            } else {
                results = JSON.stringify(result, null, '\t');
                console.log(results);
            }
            res.render('search', {
                title: 'keywords',
                message: results
            });
        });
    } else if (videoId) {
        youTubeAPI.getById(videoId, function(error, result) {
            if (youTubeAPI.statusCode == 400) {
                results = JSON.stringify(error, null, 2);
            } else {
                results = JSON.stringify(result, null, 2);
            }
            res.render('youTube', {
                title: 'videoId',
                message: results
            });
        });
    } else if (playlistId) {
        youTubeAPI.getPlayListById(playlistId, quantityResults, function(error, result) {
            if (youTubeAPI.statusCode == 400) {
                results = JSON.stringify(error, null, 2);
            } else {
                results = JSON.stringify(result, null, 2);
            }
            res.render('youTube', {
                title: 'playlistId',
                message: results
            });
        });
    } else if (!req.query[0]) {
        res.render('index', {
            title: 'Task 16'
        });
    } else {
        console.error('Server Error');
        throw new Error('Server Error');
    }
});

router.use(function(req, res) {
    console.error('Page not found');
    throw new Error('Page not found');
});

module.exports = router;