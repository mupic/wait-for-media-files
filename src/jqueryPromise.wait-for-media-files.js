import promiseWaitMediaFiles from './promise.wait-for-media-files';

jQuery(function($){
	$.fn.prsWaitMediaFiles = function(options){
		return promiseWaitMediaFiles(this, options);
	};
});