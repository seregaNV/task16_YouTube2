var express = require('express'),
    router = express.Router(),
    app = express(),
    inputData = {},
    url = {};

inputData.key = 'AIzaSyBSq2iIy-IfMWsyVaJmZW2_sy2QwNOdb7I';
inputData.question = 'node js';
inputData.videoID = 'ILpS4Fq3lmw';
inputData.listID = 'PLsuEohlthXdkRSxJTkmTstWKHgBHsd3Dx';
inputData.maxResults = 10;


url.search = 'https://www.googleapis.com/youtube/v3/search?key=' + inputData.key + '&part=snippet&q=' + inputData.question + '&maxResults=' + inputData.maxResults;
url.getById = 'https://www.googleapis.com/youtube/v3/videos?key=' + inputData.key + '&part=snippet,contentDetails,statistics,status&id=' + inputData.videoID;
url.getPlayListsById = 'https://www.googleapis.com/youtube/v3/playlists?key=' + inputData.key + '&part=snippet,contentDetails,status,player,id&id=' + inputData.listID;
url.getPlayListsItemsById = 'https://www.googleapis.com/youtube/v3/playlistItems?key=' + inputData.key + '&part=contentDetails,id,snippet,status&playlistId=' + inputData.listID + '&maxResults=' + inputData.maxResults;

if (!inputData.key){
  throw new Error('Please set a key using inputData.key method. Get an key in https://console.developers.google.com');
}
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Task 16'
  });
});

router.get('/search', function(req, res, next) {
  res.redirect(url.search);
});

router.get('/id', function(req, res, next) {
  res.redirect(url.getById);
});

router.get('/playlist', function(req, res, next) {
  res.redirect(url.getPlayListsById);
});

router.get('/playlistitem', function(req, res, next) {
  res.redirect(url.getPlayListsItemsById);
});

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