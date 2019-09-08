/* 
 * Waiting for all sources to load in a DOM element
 * Copyright (c) 2019 Lopatin Daniil
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */

var waitMediaFiles = function(domElement, options = {}){

	options = {
		audioEvent: 'canplay', //example: canplay, canplaythrough, loadeddata, loadedmetadata. https://developer.mozilla.org/ru/docs/Web/Guide/Events/Media_events
		videoEvent: 'canplay', //example: canplay, canplaythrough, loadeddata, loadedmetadata.
		...options
	}

	var elements = [];
	/* collect all elements */
	if(domElement.length){
		for (let i = 0; i < domElement.length; i++) {
			let el = domElement[i];
			let innerEls = el.getElementsByTagName('*');
			elements.push(el);
			for (let i2 = 0; i2 < innerEls.length; i2++) {
				elements.push(innerEls[i2]);
			}
		}
	}else{
		elements.push(domElement);
		let innerEls = domElement.getElementsByTagName('*');
		for (let i2 = 0; i2 < innerEls.length; i2++) {
			elements.push(innerEls[i2]);
		}
	}

	/* sort all elements */
	var images = [];
	var videos = [];
	var audios = [];
	var iframes = [];
	for (let i = 0; i < elements.length; i++) {
		let el = elements[i];
		if(el.tagName == 'VIDEO'){
			videos.push(el);
		}else if(el.tagName == 'AUDIO'){
			audios.push(el);
		}else if(el.tagName == 'IFRAME'){
			iframes.push(el);
		}else{
			images.push(el);
		}
	}
	elements = null;

	setTimeout(() => {

		/* functions */
		var allLoadedPoints = []; //should be 4 elements
		var ifSomethingLoaded = () => {
			if(allLoadedPoints.length >= 4)
				for (var i = 0; i < allLoaded.length; i++) {
					allLoaded[i]();
				}
		};
		var pushOnePoints = () => {
			allLoadedPoints.push('');
		};

		/* images */
		var wasImage = false;
		var imagesCountLoaded = 0;
		var imgLoaded = (count = true) => {
			count = typeof count == 'object'? true : count;
			if(count)
				imagesCountLoaded++;
			if(images.length == imagesCountLoaded){
				for (var i = 0; i < imagesLoaded.length; i++) {
					imagesLoaded[i](count);
				}
				pushOnePoints();
				ifSomethingLoaded();
			}
		};
		for (let i = 0; i < images.length; i++) {
			var el = images[i];

			if(el.tagName == 'IMG' || el.tagName == 'IMAGE'){
				wasImage = true;
				let img = new Image();
				img.onload = imgLoaded;
				img.onerror = imgLoaded;
				img.src = el.src;
			}else{
				let imageBG = window.getComputedStyle(el, null).getPropertyValue("background-image");
				if (imageBG == 'none'){
					imagesCountLoaded++;
					continue;
				}

				let imagelink = /url\(['"]?([^'"]*)["']?\)/mig.exec(imageBG);

				if (!imagelink){
					imagesCountLoaded++;
					continue;
				}
				wasImage = true;

				let img = new Image();
				img.onload = imgLoaded;
				img.onerror = imgLoaded;
				img.src = imagelink[1];
			}
		}
		if(!wasImage)
			imgLoaded(false);

		/* audios */
		var audiosCountLoaded = 0;
		var audLoaded = (count = true) => {
			count = typeof count == 'object'? true : count;
			if(count)
				audiosCountLoaded++;
			if(audios.length == audiosCountLoaded){
				for (var i = 0; i < audiosLoaded.length; i++) {
					audiosLoaded[i](count);
				}
				pushOnePoints();
				ifSomethingLoaded();
			}
		};
		for (let i = 0; i < audios.length; i++) {
			var el = audios[i];

			var audio = document.createElement('audio');
			audio['on' + options.audioEvent] = audLoaded;
			audio.onerror = audLoaded;
			audio.innerHTML = el.innerHTML;
			if(el.src)
				audio.src = el.src;

		}
		if(!audios.length)
			audLoaded(false);

		/* videos */
		var videosCountLoaded = 0;
		var vidLoaded = (count = true) => {
			count = typeof count == 'object'? true : count;
			if(count)
				videosCountLoaded++;
			if(videos.length == videosCountLoaded){
				for (var i = 0; i < videosLoaded.length; i++) {
					videosLoaded[i](count);
				}
				pushOnePoints();
				ifSomethingLoaded();
			}
		};
		for (let i = 0; i < videos.length; i++) {
			var el = videos[i];

			var video = document.createElement('video');
			video['on' + options.videoEvent] = vidLoaded;
			video.onerror = vidLoaded;
			video.innerHTML = el.innerHTML;
			if(el.src)
				video.src = el.src;

		}
		if(!videos.length)
			vidLoaded(false);

		/* iframe */
		var iframesCountLoaded = 0;
		var ifrLoaded = (count = true) => {
			count = typeof count == 'object'? true : count;
			if(count)
				iframesCountLoaded++;
			if(iframes.length == iframesCountLoaded){
				for (var i = 0; i < iframesLoaded.length; i++) {
					iframesLoaded[i](count);
				}
				pushOnePoints();
				ifSomethingLoaded();
			}
		};
		for (let i = 0; i < iframes.length; i++) {
			var el = iframes[i];

			if(!el.src){
				ifrLoaded();
				continue;
			}

			(() => {
				var ifr = document.createElement(el.tagName.toLocaleLowerCase());
				ifr.style.display = 'none';
				ifr.src = el.src;
				var removeIfr = function(){
					document.body.removeChild(ifr);
					ifrLoaded();
				};
				ifr.onload = removeIfr;
				ifr.onerror = removeIfr;
				document.body.appendChild(ifr);
			})();

		}
		if(!iframes.length)
			ifrLoaded(false);

	}, 5); //timeout

	var allLoaded = [];
	var audiosLoaded = [];
	var iframesLoaded = [];
	var imagesLoaded = [];
	var videosLoaded = [];

	var obj = {
		all: (callBack) => {
			allLoaded.push(callBack);
			return obj;
		},
		audio: (callBack) => {
			audiosLoaded.push(callBack);
			return obj;
		},
		iframe: (callBack) => {
			iframesLoaded.push(callBack);
			return obj;
		},
		image: (callBack) => {
			imagesLoaded.push(callBack);
			return obj;
		},
		video: (callBack) => {
			videosLoaded.push(callBack);
			return obj;
		},
	};
	return obj;
}

export default waitMediaFiles;