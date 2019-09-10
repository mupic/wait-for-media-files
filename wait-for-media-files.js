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
      if (!_el.attributes['wfmf-miss']) iframes.push(_el);
    } else if (_el.tagName != 'SOURCE') {
      images.push(_el);
    }
  }

  elements = null;
  setTimeout(function () {
    /* functions */
    var allLoadedPoints = []; //should be 4 elements

    var ifSomethingLoaded = function ifSomethingLoaded() {
      if (allLoadedPoints.length >= 4) for (var i = 0; i < allLoaded.length; i++) {
        if (typeof allLoaded[i] == 'function') allLoaded[i]();
      }
    };

    var pushOnePoints = function pushOnePoints() {
      allLoadedPoints.push('');
    };
    /* images */


    var wasImage = false;
    var imagesCountLoaded = 0;

    var imageCheckLoad = function imageCheckLoad(imageExists) {
      if (images.length == imagesCountLoaded) {
        for (var j = 0; j < imagesLoaded.length; j++) {
          if (typeof imagesLoaded[j] == 'function') imagesLoaded[j](imageExists);
        }

        pushOnePoints();
        ifSomethingLoaded();
      }
    };

    var imgLoaded = function imgLoaded(countIt, el) {
      var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (countIt) {
        imagesCountLoaded++;

        for (var i = 0; i < imagesWatch.length; i++) {
          if (typeof imagesWatch[i] == 'function') imagesWatch[i](el, error);
        }

        imageCheckLoad(countIt);
      }
    };

    for (var _i3 = 0; _i3 < images.length; _i3++) {
      var _el2 = images[_i3];

      (function (el) {
        var _imageLoaded = function _imageLoaded(src, el) {
          var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var miss_ready = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
          imgLoaded(true, el, error);

          if (!error && !miss_ready) {
            el._wfmf_ready = hashCode(src);
          }
        };

        if (el.tagName == 'IMG' || el.tagName == 'IMAGE') {
          wasImage = true;

          if (el.src && !checkHash(el, el.src)) {
            var img = new Image();

            img.onload = function () {
              return _imageLoaded(el.src, el);
            };

            img.onerror = function () {
              return _imageLoaded(el.src, el, true);
            };

            img.src = el.src;
          } else {
            _imageLoaded(el.src, el, false, true);
          }
        } else {
          var imageBG = window.getComputedStyle(el, null).getPropertyValue("background-image");

          if (imageBG == 'none') {
            imagesCountLoaded++;
            return;
          }

          var imagelink = /url\(['"]?([^'"]*)["']?\)/mig.exec(imageBG);

          if (!imagelink) {
            imagesCountLoaded++;
            return;
          }

          wasImage = true;

          if (imagelink[1] && !checkHash(el, imagelink[1])) {
            var _img = new Image();

            _img.onload = function () {
              return _imageLoaded(imagelink[1], el);
            };

            _img.onerror = function () {
              return _imageLoaded(imagelink[1], el, true);
            };

            _img.src = imagelink[1];
          } else {
            _imageLoaded(imagelink[1], el, false, true);
          }
        }
      })(_el2);

      imageCheckLoad(true);
    }

    if (!wasImage) imgLoaded(false);
    /* audios */

    var audiosCountLoaded = 0;

    var audLoaded = function audLoaded(countIt, el) {
      var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (countIt) {
        audiosCountLoaded++;

        for (var i = 0; i < audiosWatch.length; i++) {
          if (typeof audiosWatch[i] == 'function') audiosWatch[i](el, error);
        }
      }

      if (audios.length == audiosCountLoaded) {
        for (var i = 0; i < audiosLoaded.length; i++) {
          if (typeof audiosLoaded[i] == 'function') audiosLoaded[i](countIt);
        }

        pushOnePoints();
        ifSomethingLoaded();
      }
    };

    var _loop = function _loop(_i4) {
      var el = audios[_i4];

      var _audioLoaded = function _audioLoaded(el) {
        var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var miss_ready = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        audLoaded(true, el, error);

        if (!error && !miss_ready) {
          var _src = getAudioVideoSrc(el);

          el._wfmf_ready = hashCode(_src);
        }
      };

      var src = getAudioVideoSrc(el);

      if (src && !checkHash(el, src)) {
        audio = document.createElement('audio');

        audio['on' + options.audioEvent] = function () {
          return _audioLoaded(el);
        };

        audio.onerror = function () {
          return _audioLoaded(el, true);
        };

        audio.innerHTML = el.innerHTML;
        if (el.src) audio.src = el.src;
      } else {
        _audioLoaded(el, false, true);
      }
    };

    for (var _i4 = 0; _i4 < audios.length; _i4++) {
      var audio;

      _loop(_i4);
    }

    if (!audios.length) audLoaded(false);
    /* videos */

    var videosCountLoaded = 0;

    var vidLoaded = function vidLoaded(countIt, el) {
      var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (countIt) {
        videosCountLoaded++;

        for (var i = 0; i < videosWatch.length; i++) {
          if (typeof videosWatch[i] == 'function') videosWatch[i](el, error);
        }
      }

      if (videos.length == videosCountLoaded) {
        for (var i = 0; i < videosLoaded.length; i++) {
          if (typeof videosLoaded[i] == 'function') videosLoaded[i](countIt);
        }

        pushOnePoints();
        ifSomethingLoaded();
      }
    };

    var _loop2 = function _loop2(_i5) {
      var el = videos[_i5];

      var _videoLoaded = function _videoLoaded(el) {
        var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var miss_ready = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        vidLoaded(true, el, error);

        if (!error && !miss_ready) {
          var _src2 = getAudioVideoSrc(el);

          el._wfmf_ready = hashCode(_src2);
        }
      };

      var src = getAudioVideoSrc(el);

      if (src && !checkHash(el, src)) {
        video = document.createElement('video');

        video['on' + options.videoEvent] = function () {
          return _videoLoaded(el);
        };

        video.onerror = function () {
          return _videoLoaded(el, true);
        };

        video.innerHTML = el.innerHTML;
        if (el.src) video.src = el.src;
      } else {
        _videoLoaded(el, false, true);
      }
    };

    for (var _i5 = 0; _i5 < videos.length; _i5++) {
      var video;

      _loop2(_i5);
    }

    if (!videos.length) vidLoaded(false);
    /* iframe */

    var iframesCountLoaded = 0;

    var ifrLoaded = function ifrLoaded(countIt, el) {
      var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (countIt) {
        iframesCountLoaded++;

        for (var i = 0; i < iframesWatch.length; i++) {
          if (typeof iframesWatch[i] == 'function') iframesWatch[i](el, error);
        }
      }

      if (iframes.length == iframesCountLoaded) {
        for (var i = 0; i < iframesLoaded.length; i++) {
          if (typeof iframesLoaded[i] == 'function') iframesLoaded[i](countIt);
        }

        pushOnePoints();
        ifSomethingLoaded();
      }
    };

    for (var _i6 = 0; _i6 < iframes.length; _i6++) {
      var _el3 = iframes[_i6];

      if (!_el3.src) {
        ifrLoaded(true, _el3, true);
        continue;
      }

      (function (el) {
        var _iframeLoaded = function _iframeLoaded(el) {
          var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var miss_ready = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          ifrLoaded(true, el, error);
          if (!error && !miss_ready) el._wfmf_ready = hashCode(el.src);
        };

        if (el.src && !checkHash(el, el.src)) {
          var ifr = document.createElement(el.tagName.toLocaleLowerCase());
          ifr.style.display = 'none';
          ifr.setAttribute("wfmf-miss", '1');
          ifr.src = el.src;

          var removeIfr = function removeIfr(el) {
            var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            document.body.removeChild(ifr);

            _iframeLoaded(el, error);
          };

          ifr.onload = function () {
            return removeIfr(el);
          };

          ifr.onerror = function () {
            return removeIfr(el, true);
          };

          document.body.appendChild(ifr);
        } else {
          _iframeLoaded(el, false, true);
        }
      })(_el3);
    }

    if (!iframes.length) ifrLoaded(false);
  }, 5); //timeout

  var allLoaded = [];
  var audiosLoaded = [];
  var audiosWatch = [];
  var iframesLoaded = [];
  var iframesWatch = [];
  var imagesLoaded = [];
  var imagesWatch = [];
  var videosLoaded = [];
  var videosWatch = [];
  var obj = {
    all: function all(callBack) {
      allLoaded.push(callBack);
      return obj;
    },
    audio: function audio(callBack, watch) {
      audiosLoaded.push(callBack);
      audiosWatch.push(watch);
      return obj;
    },
    iframe: function iframe(callBack, watch) {
      iframesLoaded.push(callBack);
      iframesWatch.push(watch);
      return obj;
    },
    image: function image(callBack, watch) {
      imagesLoaded.push(callBack);
      imagesWatch.push(watch);
      return obj;
    },
    video: function video(callBack, watch) {
      videosLoaded.push(callBack);
      videosWatch.push(watch);
      return obj;
    }
  };
  return obj;
};

function getAudioVideoSrc(el) {
  var src = '';

  if (!el.src) {
    for (var i = 0; i < el.children.length; i++) {
      if (el.children[i].src) src += el.children[i].src;
    }
  } else {
    src = el.src;
  }

  return src;
}

function checkHash(el, src) {
  console.log(el._wfmf_ready, src);
  return el._wfmf_ready && el._wfmf_ready === hashCode(src);
}

function hashCode(str) {
  var hash = 0,
      i,
      chr;
  if (str.length === 0) return hash;

  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}

;
var _default = waitMediaFiles;
exports.default = _default;