"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("./promise"));

(function ($) {
  $.fn.prsWaitMediaFiles = function (options) {
    return (0, _promise.default)(this, options);
  };
})(jQuery);