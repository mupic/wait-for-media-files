import promiseWaitMediaFiles from './promise';

(function($){
	$.fn.prsWaitMediaFiles = function(options){
		return promiseWaitMediaFiles(this, options);
	};
})(jQuery);