import waitMediaFiles from './wait-for-media-files';

(function($){
	$.fn.waitMediaFiles = function(options){
		return waitMediaFiles(this, options);
	};
})(jQuery);