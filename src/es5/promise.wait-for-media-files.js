"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _waitForMediaFiles = _interopRequireDefault(require("./wait-for-media-files"));

var promiseWaitMediaFiles = function promiseWaitMediaFiles(domElement, options) {
  var callbacks = (0, _waitForMediaFiles["default"])(domElement, options);
  return {
    all: function all() {
      return new Promise(function (resolve) {
        callbacks.all(resolve);
      });
    },
    audio: function audio() {
      return new Promise(function (resolve) {
        callbacks.audio(resolve);
      });
    },
    iframe: function iframe() {
      return new Promise(function (resolve) {
        callbacks.iframe(resolve);
      });
    },
    image: function image() {
      return new Promise(function (resolve) {
        callbacks.image(resolve);
      });
    },
    video: function video() {
      return new Promise(function (resolve) {
        callbacks.video(resolve);
      });
    }
  };
};

var _default = promiseWaitMediaFiles;
exports["default"] = _default;