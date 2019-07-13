# waitMediaFiles.js
## Installation
````bash
npm i wait-media-files
````

## Require
````javascript
import waitMediaFiles from 'wait-media-files';

waitMediaFiles(document.getElementsByTagName('body'), {})
.image(function(wasFound){})
.audio(function(wasFound){})
.video(function(wasFound){})
.iframe(function(wasFound){})
.all(function(){})
````

## Example
### Vanilla js
````javascript
require('wait-media-files/src/es5/window.wait-for-media-files');
window.waitMediaFiles(document.getElementsByTagName('body'), {})
.image(function(wasFound){})
.audio(function(wasFound){})
.video(function(wasFound){})
.iframe(function(wasFound){})
.all(function(){})
````

### jQuery
````javascript
require('jquery');
require('wait-media-files/src/es5/jquery.wait-for-media-files');
$('body').waitMediaFiles({})
.image(function(wasFound){})
.audio(function(wasFound){})
.video(function(wasFound){})
.iframe(function(wasFound){})
.all(function(){})
````

## Promise example
### Vanilla js
````javascript
import prsWaitMediaFiles from 'wait-media-files/src/es5/promise.wait-media-files';
var callbacks = prsWaitMediaFiles(document.getElementsByTagName('body'), {});
callbacks.image().then(function(wasFound){});
callbacks.audio().then(function(wasFound){});
callbacks.video().then(function(wasFound){});
callbacks.iframe().then(function(wasFound){});
callbacks.all().then(function(){});
````

### jQuery
````javascript
require('jquery');
require('wait-media-files/src/es5/jqueryPromise.wait-for-media-files');
var callbacks = $('body').prsWaitMediaFiles({});
callbacks.image().then(function(wasFound){});
callbacks.audio().then(function(wasFound){});
callbacks.video().then(function(wasFound){});
callbacks.iframe().then(function(wasFound){});
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