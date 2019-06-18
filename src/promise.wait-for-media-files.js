import waitMediaFiles from './wait-for-media-files';

var promiseWaitMediaFiles = function(domElement, options){
	var callbacks = waitMediaFiles(domElement, options);

	return {
		all(){
			return new Promise((resolve) => {
				callbacks.all(resolve);
			});
		},
		audio(){
			return new Promise((resolve) => {
				callbacks.audio(resolve);
			});
		},
		iframe(){
			return new Promise((resolve) => {
				callbacks.iframe(resolve);
			});
		},
		image(){
			return new Promise((resolve) => {
				callbacks.image(resolve);
			});
		},
		video(){
			return new Promise((resolve) => {
				callbacks.video(resolve);
			});
		},
	};
};

export default promiseWaitMediaFiles;