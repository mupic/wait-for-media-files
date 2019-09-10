"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _waitForMediaFiles = _interopRequireDefault(require("./wait-for-media-files"));

(function ($) {
  $.fn.waitMediaFiles = function (options) {
    return (0, _waitForMediaFiles.default)(this, options);
  };
})(jQuery);