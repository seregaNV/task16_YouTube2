var request = require('request');
var queryString = require('querystring');

var YouTube = function() {

    var _this = this;
    _this.url = 'https://www.googleapis.com/youtube/v3/';

    _this.params = {};
    _this.parts = [];

    _this.setKey = function(key) {
        _this.addParam('key', key);
    };

    _this.addPart = function(name) {
        _this.parts.push(name);
    };

    _this.addParam = function(key, value) {
        _this.params[key] = value;
    };

    _this.getUrl = function(path) {
        return _this.url + path + '?' + queryString.stringify(_this.params);
    };

    _this.getParts = function() {
        return _this.parts.join(',');
    };

    _this.request = function(url, callback) {
        request(url, function(error, response, body) {
            if (error) {
                callback(error);
            }
            else {
                var data = JSON.parse(body);
                if (response.statusCode == 200) {
                    callback(null, data);
                }
                else {
                    callback(data.error);
                }
            }
        });
    };

    _this.newError = function(message) {
        return {
            error : {
                message: message
            }
        };
    };

    _this.validate = function() {
        if (!_this.params.key) {
            return _this.newError('Please set a key using setKey method. Get an key in https://console.developers.google.com');
        }
        else {
            return null;
        }
    };

    _this.clearParts = function() {
        _this.parts = [];
    };

    _this.getById = function(id, callback) {
        var validate = _this.validate();
        if (validate !== null) {
            callback(validate);
        }
        else {
            _this.clearParts();
            _this.addPart('snippet');
            _this.addPart('contentDetails');
            _this.addPart('statistics');
            _this.addPart('status');
            _this.addParam('part', _this.getParts());
            _this.addParam('id', id);
            _this.request(_this.getUrl('videos'), callback);
        }
    };

    _this.getPlayListsById = function(id, callback) {
        var validate = _this.validate();

        if (validate !== null) {
            callback(validate);
        }
        else {
            _this.clearParts();
            _this.addPart('snippet');
            _this.addPart('contentDetails');
            _this.addPart('status');
            _this.addPart('player');
            _this.addPart('id');
            _this.addParam('part', _this.getParts());
            _this.addParam('id', id);
            _this.request(_this.getUrl('playlists'), callback);
        }
    };

    _this.getPlayListsItemsById = function(id, maxResults, callback) {
        var validate = _this.validate();
        if (validate !== null) {
            callback(validate);
        }
        else {
            _this.clearParts();

            _this.addPart('contentDetails');
            _this.addPart('id');
            _this.addPart('snippet');
            _this.addPart('status');
            _this.addParam('part', _this.getParts());
            _this.addParam('playlistId', id);
            _this.addParam('maxResults', maxResults);
            _this.request(_this.getUrl('playlistItems'), callback);
        }
    };

    _this.search = function(query, maxResults, callback) {
        var validate = _this.validate();
        if (validate !== null) {
            callback(validate);
        }
        else {
            _this.clearParts();
            _this.addPart('snippet');
            _this.addParam('part', _this.getParts());
            _this.addParam('q', query);
            _this.addParam('maxResults', maxResults);
            _this.request(_this.getUrl('search'), callback);
        }
    };

    _this.related = function(id, maxResults, callback) {
        var validate = _this.validate();
        if (validate !== null) {
            callback(validate);
        }
        else {
            _this.clearParts();
            _this.addPart('snippet');
            _this.addParam('part', _this.getParts());
            _this.addParam('relatedToVideoId', id);
            _this.addParam('maxResults', maxResults);
            _this.addParam('type', 'video');
            _this.addParam('order', 'relevance');
            _this.request(_this.getUrl('search'), callback);
        }
    };
};

module.exports = YouTube;
