'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SMS = function () {
  function SMS(_ref) {
    var _ref$AccessKeyId = _ref.AccessKeyId,
        AccessKeyId = _ref$AccessKeyId === undefined ? '' : _ref$AccessKeyId,
        _ref$AccessKeySecret = _ref.AccessKeySecret,
        AccessKeySecret = _ref$AccessKeySecret === undefined ? '' : _ref$AccessKeySecret;

    _classCallCheck(this, SMS);

    this.AccessKeyId = AccessKeyId;
    this.AccessKeySecret = AccessKeySecret;
    this.api = 'https://dysmsapi.aliyuncs.com/';
  }

  _createClass(SMS, [{
    key: 'send',
    value: function send(args) {
      var _this = this;

      var params = {
        Version: '2017-05-25',
        Format: 'JSON',
        SignatureMethod: 'HMAC-SHA1',
        SignatureNonce: this.getRandomStr(25),
        SignatureVersion: '1.0',
        AccessKeyId: this.AccessKeyId,
        Timestamp: new Date().toISOString()
      };
      Object.assign(params, args);
      params.Signature = this.getSignature(params);
      return new Promise(function (resolve, reject) {
        (0, _request2.default)({
          method: 'POST',
          url: _this.api,
          headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
          },
          form: params
        }, function (error, response, body) {
          if (response.statusCode === 201 || response.statusCode === 200) {
            resolve(body);
          } else {
            reject(body, error);
          }
        });
      });
    }
  }, {
    key: 'getRandomStr',
    value: function getRandomStr(length) {
      return Array.from({ length: length }).map(function (value) {
        return Math.floor(Math.random() * 10);
      }).join('');
    }
  }, {
    key: 'getSignature',
    value: function getSignature(params) {
      var paramsStr = this.toQueryString(params);
      var signTemp = 'POST&' + encodeURIComponent('/') + '&' + encodeURIComponent(paramsStr);
      var signature = _crypto2.default.createHmac('sha1', this.AccessKeySecret + '&').update(signTemp).digest('base64');
      return signature;
    }
  }, {
    key: 'toQueryString',
    value: function toQueryString(params) {
      return Object.keys(params).sort().map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&');
    }
  }]);

  return SMS;
}();

module.exports = SMS;