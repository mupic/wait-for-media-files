import waitMediaFiles from './wait-for-media-files';

var promiseWaitMediaFiles = function(domElement, options){
	var callbacks = waitMediaFiles(domElement, options);

	return {
		all(watch){
			return new Promise((resolve) => {
				callbacks.all(resolve, watch);
			});
		},
		audio(watch){
			return new Promise((resolve) => {
				callbacks.audio(resolve, watch);
			});
		},
		iframe(watch){
			return new Promise((resolve) => {
				callbacks.iframe(resolve, watch);
			});
		},
		image(watch){
			return new Promise((resolve) => {
				callbacks.image(resolve, watch);
			});
		},
		video(watch){
			return new Promise((resolve) => {
				callbacks.video(resolve, watch);
			});
		},
	};
};

export default promiseWaitMediaFiles;