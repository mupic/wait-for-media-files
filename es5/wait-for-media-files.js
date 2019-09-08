"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* 
 * Waiting for all sources to load in a DOM element
 * Copyright (c) 2019 Lopatin Daniil
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
var waitMediaFiles = function waitMediaFiles(domElement) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options = _objectSpread({
    audioEvent: 'canplay',
    //example: canplay, canplaythrough, loadeddata, loadedmetadata. https://developer.mozilla.org/ru/docs/Web/Guide/Events/Media_events
    videoEvent: 'canplay'
  }, options);
  var elements = [];
  /* collect all elements */

  if (domElement.length) {
    for (var i = 0; i < domElement.length; i++) {
      var el = domElement[i];
      var innerEls = el.getElementsByTagName('*');
      elements.push(el);

      for (var i2 = 0; i2 < innerEls.length; i2++) {
        elements.push(innerEls[i2]);
      }
    }
  } else {
    elements.push(domElement);

    var _innerEls = domElement.getElementsByTagName('*');

    for (var _i = 0; _i < _innerEls.length; _i++) {
      elements.push(_innerEls[_i]);
    }
  }
  /* sort all elements */


  var images = [];
  var videos = [];
  var audios = [];
  var iframes = [];

  for (var _i2 = 0; _i2 < elements.length; _i2++) {
    var _el = elements[_i2];

    if (_el.tagName == 'VIDEO') {
      videos.push(_el);
    } else if (_el.tagName == 'AUDIO') {
      audios.push(_el);
    } else if (_el.tagName == 'IFRAME') {
      iframes.push(_el);
    } else {
      images.push(_el);
    }
  }

  elements = null;
  setTimeout(function () {
    /* functions */
    var allLoadedPoints = []; //should be 4 elements

    var ifSomethingLoaded = function ifSomethingLoaded() {
      if (allLoadedPoints.length >= 4) for (var i = 0; i < allLoaded.length; i++) {
        allLoaded[i]();
      }
    };

    var pushOnePoints = function pushOnePoints() {
      allLoadedPoints.push('');
    };
    /* images */


    var wasImage = false;
    var imagesCountLoaded = 0;

    var imgLoaded = function imgLoaded() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      count = (0, _typeof2.default)(count) == 'object' ? true : count;
      if (count) imagesCountLoaded++;

      if (images.length == imagesCountLoaded) {
        for (var i = 0; i < imagesLoaded.length; i++) {
          imagesLoaded[i](count);
        }

        pushOnePoints();
        ifSomethingLoaded();
      }
    };

    for (var _i3 = 0; _i3 < images.length; _i3++) {
      var el = images[_i3];

      if (el.tagName == 'IMG' || el.tagName == 'IMAGE') {
        wasImage = true;
        var img = new Image();
        img.onload = imgLoaded;
        img.onerror = imgLoaded;
        img.src = el.src;
      } else {
        var imageBG = window.getComputedStyle(el, null).getPropertyValue("background-image");

        if (imageBG == 'none') {
          imagesCountLoaded++;
          continue;
        }

        var imagelink = /url\(['"]?([^'"]*)["']?\)/mig.exec(imageBG);

        if (!imagelink) {
          imagesCountLoaded++;
          continue;
        }

        wasImage = true;

        var _img = new Image();

        _img.onload = imgLoaded;
        _img.onerror = imgLoaded;
        _img.src = imagelink[1];
      }
    }

    if (!wasImage) imgLoaded(false);
    /* audios */

    var audiosCountLoaded = 0;

    var audLoaded = function audLoaded() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      count = (0, _typeof2.default)(count) == 'object' ? true : count;
      if (count) audiosCountLoaded++;

      if (audios.length == audiosCountLoaded) {
        for (var i = 0; i < audiosLoaded.length; i++) {
          audiosLoaded[i](count);
        }

        pushOnePoints();
        ifSomethingLoaded();
      }
    };

    for (var _i4 = 0; _i4 < audios.length; _i4++) {
      var el = audios[_i4];
      var audio = document.createElement('audio');
      audio['on' + options.audioEvent] = audLoaded;
      audio.onerror = audLoaded;
      audio.innerHTML = el.innerHTML;
      if (el.src) audio.src = el.src;
    }

    if (!audios.length) audLoaded(false);
    /* videos */

    var videosCountLoaded = 0;

    var vidLoaded = function vidLoaded() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      count = (0, _typeof2.default)(count) == 'object' ? true : count;
      if (count) videosCountLoaded++;

      if (videos.length == videosCountLoaded) {
        for (var i = 0; i < videosLoaded.length; i++) {
          videosLoaded[i](count);
        }

        pushOnePoints();
        ifSomethingLoaded();
      }
    };

    for (var _i5 = 0; _i5 < videos.length; _i5++) {
      var el = videos[_i5];
      var video = document.createElement('video');
      video['on' + options.videoEvent] = vidLoaded;
      video.onerror = vidLoaded;
      video.innerHTML = el.innerHTML;
      if (el.src) video.src = el.src;
    }

    if (!videos.length) vidLoaded(false);
    /* iframe */

    var iframesCountLoaded = 0;

    var ifrLoaded = function ifrLoaded() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      count = (0, _typeof2.default)(count) == 'object' ? true : count;
      if (count) iframesCountLoaded++;

      if (iframes.length == iframesCountLoaded) {
        for (var i = 0; i < iframesLoaded.length; i++) {
          iframesLoaded[i](count);
        }

        pushOnePoints();
        ifSomethingLoaded();
      }
    };

    for (var _i6 = 0; _i6 < iframes.length; _i6++) {
      var el = iframes[_i6];

      if (!el.src) {
        ifrLoaded();
        continue;
      }

      (function () {
        var ifr = document.createElement(el.tagName.toLocaleLowerCase());
        ifr.style.display = 'none';
        ifr.src = el.src;

        var removeIfr = function removeIfr() {
          document.body.removeChild(ifr);
          ifrLoaded();
        };

        ifr.onload = removeIfr;
        ifr.onerror = removeIfr;
        document.body.appendChild(ifr);
      })();
    }

    if (!iframes.length) ifrLoaded(false);
  }, 5); //timeout

  var allLoaded = [];
  var audiosLoaded = [];
  var iframesLoaded = [];
  var imagesLoaded = [];
  var videosLoaded = [];
  var obj = {
    all: function all(callBack) {
      allLoaded.push(callBack);
      return obj;
    },
    audio: function audio(callBack) {
      audiosLoaded.push(callBack);
      return obj;
    },
    iframe: function iframe(callBack) {
      iframesLoaded.push(callBack);
      return obj;
    },
    image: function image(callBack) {
      imagesLoaded.push(callBack);
      return obj;
    },
    video: function video(callBack) {
      videosLoaded.push(callBack);
      return obj;
    }
  };
  return obj;
};

var _default = waitMediaFiles;
exports.default = _default;