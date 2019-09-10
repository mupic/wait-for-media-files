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
			if(!el.attributes['wfmf-miss'])
				iframes.push(el);
		}else if(el.tagName != 'SOURCE'){
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
					if(typeof allLoaded[i] == 'function')
						allLoaded[i]();
				}
		};
		var pushOnePoints = () => {
			allLoadedPoints.push('');
		};

		/* images */
		var wasImage = false;
		var imagesCountLoaded = 0;
		var imageCheckLoad = (imageExists) => {
			if(images.length == imagesCountLoaded){
				for (let j = 0; j < imagesLoaded.length; j++) {
					if(typeof imagesLoaded[j] == 'function')
						imagesLoaded[j](imageExists);
				}
				pushOnePoints();
				ifSomethingLoaded();
			}
		};
		var imgLoaded = (countIt, el, error = false) => {
			if(countIt){
				imagesCountLoaded++;
				for (var i = 0; i < imagesWatch.length; i++) {
					if(typeof imagesWatch[i] == 'function')
						imagesWatch[i](el, error);
				}

				imageCheckLoad(countIt);
			}
		};
		for (let i = 0; i < images.length; i++) {
			let el = images[i];

			((el) => {
				let _imageLoaded = (src, el, error = false, miss_ready = false) => {
					imgLoaded(true, el, error);

					if(!error && !miss_ready){
						el._wfmf_ready = hashCode(src);
					}

					if(typeof el._wfmf_watch == 'object'){
						for (var i = 0; i < el._wfmf_watch.length; i++) {
							if(typeof el._wfmf_watch[i] == 'function')
								el._wfmf_watch[i](src, el, error);
						}
						delete el._wfmf_watch;
					}
				};

				if(el.tagName == 'IMG' || el.tagName == 'IMAGE'){
					wasImage = true;

					if(typeof el._wfmf_watch == 'object'){ //if the event was bound in the last function call, just wait for it to be called
						el._wfmf_watch.push((_src, _el, _error) => {
							imgLoaded(true, _el, _error);
						});
					}else if(el.src && !checkHash(el, el.src)){
						if(typeof el._wfmf_watch == 'undefined')
							el._wfmf_watch = [];

						let img = new Image();
						img.onload = () => _imageLoaded(el.src, el);
						img.onerror = () => _imageLoaded(el.src, el, true);
						img.src = el.src;
					}else{
						_imageLoaded(el.src, el, false, true);
					}
				}else{
					let imageBG = window.getComputedStyle(el, null).getPropertyValue("background-image");
					if (imageBG == 'none'){
						imagesCountLoaded++;
						return;
					}

					let imagelink = /url\(['"]?([^'"]*)["']?\)/mig.exec(imageBG);

					if (!imagelink){
						imagesCountLoaded++;
						return;
					}
					wasImage = true;

					if(typeof el._wfmf_watch == 'object'){ //if the event was bound in the last function call, just wait for it to be called
						el._wfmf_watch.push((_src, _el, _error) => {
							imgLoaded(true, _el, _error);
						});
					}else if(imagelink[1] && !checkHash(el, imagelink[1])){
						if(typeof el._wfmf_watch == 'undefined')
							el._wfmf_watch = [];

						let img = new Image();
						img.onload = () => _imageLoaded(imagelink[1], el);
						img.onerror = () => _imageLoaded(imagelink[1], el, true);
						img.src = imagelink[1];
					}else{
						_imageLoaded(imagelink[1], el, false, true);
					}
				}
			})(el);

			imageCheckLoad(wasImage);
		}
		if(!wasImage)
			imgLoaded(false);

		/* audios */
		var audiosCountLoaded = 0;
		var audLoaded = (countIt, el, error = false) => {
			if(countIt){
				audiosCountLoaded++;
				for (var i = 0; i < audiosWatch.length; i++) {
					if(typeof audiosWatch[i] == 'function')
						audiosWatch[i](el, error);
				}
			}
			if(audios.length == audiosCountLoaded){
				for (var i = 0; i < audiosLoaded.length; i++) {
					if(typeof audiosLoaded[i] == 'function')
						audiosLoaded[i](countIt);
				}
				pushOnePoints();
				ifSomethingLoaded();
			}
		};
		for (let i = 0; i < audios.length; i++) {
			let el = audios[i];

			let _audioLoaded = (el, error = false, miss_ready = false) => {
				audLoaded(true, el, error);

				if(!error && !miss_ready){
					let src = getAudioVideoSrc(el);
					el._wfmf_ready = hashCode(src);
				}
				if(typeof el._wfmf_watch == 'object'){
					for (var i = 0; i < el._wfmf_watch.length; i++) {
						if(typeof el._wfmf_watch[i] == 'function')
							el._wfmf_watch[i](el, error);
					}
					delete el._wfmf_watch;
				}
			};

			let src = getAudioVideoSrc(el);
			if(typeof el._wfmf_watch == 'object'){ //if the event was bound in the last function call, just wait for it to be called
				el._wfmf_watch.push((_el, _error) => {
					audLoaded(true, _el, _error);
				});
			}else if(src && !checkHash(el, src)){
				if(typeof el._wfmf_watch == 'undefined')
					el._wfmf_watch = [];

				var audio = document.createElement('audio');
				audio['on' + options.audioEvent] = () => _audioLoaded(el);
				audio.onerror = () => _audioLoaded(el, true);
				audio.innerHTML = el.innerHTML;
				if(el.src)
					audio.src = el.src;
			}else{
				_audioLoaded(el, false, true);
			}

		}
		if(!audios.length)
			audLoaded(false);

		/* videos */
		var videosCountLoaded = 0;
		var vidLoaded = (countIt, el, error = false) => {
			if(countIt){
				videosCountLoaded++;
				for (var i = 0; i < videosWatch.length; i++) {
					if(typeof videosWatch[i] == 'function')
						videosWatch[i](el, error);
				}
			}
			if(videos.length == videosCountLoaded){
				for (var i = 0; i < videosLoaded.length; i++) {
					if(typeof videosLoaded[i] == 'function')
						videosLoaded[i](countIt);
				}
				pushOnePoints();
				ifSomethingLoaded();
			}
		};
		for (let i = 0; i < videos.length; i++) {
			let el = videos[i];

			let _videoLoaded = (el, error = false, miss_ready = false) => {
				vidLoaded(true, el, error);

				if(!error && !miss_ready){
					let src = getAudioVideoSrc(el);
					el._wfmf_ready = hashCode(src);
				}

				if(typeof el._wfmf_watch == 'object'){
					for (var i = 0; i < el._wfmf_watch.length; i++) {
						if(typeof el._wfmf_watch[i] == 'function')
							el._wfmf_watch[i](el, error);
					}
					delete el._wfmf_watch;
				}
			};

			let src = getAudioVideoSrc(el);
			if(typeof el._wfmf_watch == 'object'){ //if the event was bound in the last function call, just wait for it to be called
				el._wfmf_watch.push((_el, _error) => {
					vidLoaded(true, _el, _error);
				});
			}else if(src && !checkHash(el, src)){
				if(typeof el._wfmf_watch == 'undefined')
					el._wfmf_watch = [];

				var video = document.createElement('video');
				video['on' + options.videoEvent] = () => _videoLoaded(el);
				video.onerror = () => _videoLoaded(el, true);
				video.innerHTML = el.innerHTML;
				if(el.src)
					video.src = el.src;
			}else{
				_videoLoaded(el, false, true);
			}

		}
		if(!videos.length)
			vidLoaded(false);

		/* iframe */
		var iframesCountLoaded = 0;
		var ifrLoaded = (countIt, el, error = false) => {
			if(countIt){
				iframesCountLoaded++;
				for (var i = 0; i < iframesWatch.length; i++) {
					if(typeof iframesWatch[i] == 'function')
						iframesWatch[i](el, error);
				}
			}
			if(iframes.length == iframesCountLoaded){
				for (var i = 0; i < iframesLoaded.length; i++) {
					if(typeof iframesLoaded[i] == 'function')
						iframesLoaded[i](countIt);
				}
				pushOnePoints();
				ifSomethingLoaded();
			}
		};
		for (let i = 0; i < iframes.length; i++) {
			let el = iframes[i];

			if(!el.src){
				ifrLoaded(true, el, true);
				continue;
			}

			((el) => {

				var _iframeLoaded = (el, error = false, miss_ready = false) => {
					ifrLoaded(true, el, error);

					if(!error && !miss_ready)
						el._wfmf_ready = hashCode(el.src);

					if(typeof el._wfmf_watch == 'object'){
						for (var i = 0; i < el._wfmf_watch.length; i++) {
							if(typeof el._wfmf_watch[i] == 'function')
								el._wfmf_watch[i](el, error);
						}
						delete el._wfmf_watch;
					}
				};

				if(typeof el._wfmf_watch == 'object'){ //if the event was bound in the last function call, just wait for it to be called
					el._wfmf_watch.push((_el, _error) => {
						ifrLoaded(true, _el, _error);
					});
				}else if(el.src && !checkHash(el, el.src)){
					if(typeof el._wfmf_watch == 'undefined')
						el._wfmf_watch = [];

					var ifr = document.createElement(el.tagName.toLocaleLowerCase());
					ifr.style.display = 'none';
					ifr.setAttribute("wfmf-miss", '1');
					ifr.src = el.src;
					var removeIfr = function(el, error = false){
						document.body.removeChild(ifr);

						_iframeLoaded(el, error);
					};
					ifr.onload = () => removeIfr(el);
					ifr.onerror = () => removeIfr(el, true);
					document.body.appendChild(ifr);
				}else{
					_iframeLoaded(el, false, true);
				}

			})(el);

		}
		if(!iframes.length)
			ifrLoaded(false);

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
		all: (callBack) => {
			allLoaded.push(callBack);
			return obj;
		},
		audio: (callBack, watch) => {
			audiosLoaded.push(callBack);
			audiosWatch.push(watch);
			return obj;
		},
		iframe: (callBack, watch) => {
			iframesLoaded.push(callBack);
			iframesWatch.push(watch);
			return obj;
		},
		image: (callBack, watch) => {
			imagesLoaded.push(callBack);
			imagesWatch.push(watch);
			return obj;
		},
		video: (callBack, watch) => {
			videosLoaded.push(callBack);
			videosWatch.push(watch);
			return obj;
		},
	};
	return obj;
}

function getAudioVideoSrc(el){
	var src = '';
	if(!el.src){
		for (var i = 0; i < el.children.length; i++) {
			if(el.children[i].src)
				src += el.children[i].src;
		}
	}else{
		src = el.src;
	}

	return src;
}

function checkHash(el, src){
	return el._wfmf_ready && el._wfmf_ready === hashCode(src);
}

function hashCode(str) {
	var hash = 0,
		i, chr;
	if (str.length === 0) return hash;
	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

export default waitMediaFiles;