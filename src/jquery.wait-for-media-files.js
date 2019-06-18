import waitMediaFiles from './wait-for-media-files';

jQuery(function($){
	$.fn.waitMediaFiles = function(options){
		return waitMediaFiles(this, options);
	};
});