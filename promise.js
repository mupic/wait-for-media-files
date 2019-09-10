"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _waitForMediaFiles = _interopRequireDefault(require("./wait-for-media-files"));

var promiseWaitMediaFiles = function promiseWaitMediaFiles(domElement, options) {
  var callbacks = (0, _waitForMediaFiles.default)(domElement, options);
  return {
    all: function all(watch) {
      return new Promise(function (resolve) {
        callbacks.all(resolve, watch);
      });
    },
    audio: function audio(watch) {
      return new Promise(function (resolve) {
        callbacks.audio(resolve, watch);
      });
    },
    iframe: function iframe(watch) {
      return new Promise(function (resolve) {
        callbacks.iframe(resolve, watch);
      });
    },
    image: function image(watch) {
      return new Promise(function (resolve) {
        callbacks.image(resolve, watch);
      });
    },
    video: function video(watch) {
      return new Promise(function (resolve) {
        callbacks.video(resolve, watch);
      });
    }
  };
};

var _default = promiseWaitMediaFiles;
exports.default = _default;