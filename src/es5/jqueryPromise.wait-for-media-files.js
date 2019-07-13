"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("./promise.wait-for-media-files"));

jQuery(function ($) {
  $.fn.prsWaitMediaFiles = function (options) {
    return (0, _promise["default"])(this, options);
  };
});