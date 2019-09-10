# waitMediaFiles.js
## Installation
````bash
npm i wait-media-files
````

## Require
````javascript
import waitMediaFiles from 'wait-media-files';

waitMediaFiles(document.getElementsByTagName('body'), {})
.image(function(imageExists){}, function(el, isError){}) //The first callback will be called when all the images are loaded. The second callback will be called every time a image is loaded.
.audio(function(audioExists){}, function(el, isError){})
.video(function(videoExists){}, function(el, isError){})
.iframe(function(iframeExists){}, function(el, isError){})
.all(function(){})
````

## Example
### Vanilla js
````javascript
require('wait-media-files/global');
window.waitMediaFiles(document.getElementsByTagName('body'), {})
.image(function(imageExists){}, function(el, isError){})
.audio(function(audioExists){}, function(el, isError){})
.video(function(videoExists){}, function(el, isError){})
.iframe(function(iframeExists){}, function(el, isError){})
.all(function(){})
````

### jQuery
````javascript
require('jquery');
require('wait-media-files/jquery');
$('body').waitMediaFiles({})
.image(function(imageExists){}, function(el, isError){})
.audio(function(audioExists){}, function(el, isError){})
.video(function(videoExists){}, function(el, isError){})
.iframe(function(iframeExists){}, function(el, isError){})
.all(function(){})
````

## Promise example
### Vanilla js
````javascript
import prsWaitMediaFiles from 'wait-media-files/promise';
var callbacks = prsWaitMediaFiles(document.getElementsByTagName('body'), {});
callbacks.image(function(el, isError){}).then(function(imageExists){});
callbacks.audio(function(el, isError){}).then(function(audioExists){});
callbacks.video(function(el, isError){}).then(function(videoExists){});
callbacks.iframe(function(el, isError){}).then(function(iframeExists){});
callbacks.all().then(function(){});
````

### jQuery
````javascript
require('jquery');
require('wait-media-files/jqueryPromise');
var callbacks = $('body').prsWaitMediaFiles({});
callbacks.image(function(el, isError){}).then(function(imageExists){});
callbacks.audio(function(el, isError){}).then(function(audioExists){});
callbacks.video(function(el, isError){}).then(function(videoExists){});
callbacks.iframe(function(el, isError){}).then(function(iframeExists){});
callbacks.all().then(function(){});
````

## waitMediaFiles(domElements[, config])
##### config
````javascript
{
	audioEvent: 'canplay', //example: canplay, canplaythrough, loadeddata, loadedmetadata.
	videoEvent: 'canplay', //example: canplay, canplaythrough, loadeddata, loadedmetadata.
}
````
"audioEvent", "videoEvent" determines when files is considered loaded.
More info: https://developer.mozilla.org/ru/docs/Web/Guide/Events/Media_events