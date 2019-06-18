var before_load = document.getElementById('before_load');
var callbacks = jQuery('body').prsWaitMediaFiles();
callbacks.image().then(function(found){
	var li = document.createElement('li');
	li.innerHTML = found? 'Images loaded!' : 'Images not found!';
	before_load.appendChild(li);
})
callbacks.audio().then(function(found){
	var li = document.createElement('li');
	li.innerHTML = found? 'Audio loaded!' : 'Audio not found!';
	before_load.appendChild(li);
})
callbacks.video().then(function(found){
	var li = document.createElement('li');
	li.innerHTML = found? 'Video loaded!' : 'Video not found!';
	before_load.appendChild(li);
})
callbacks.iframe().then(function(found){
	var li = document.createElement('li');
	li.innerHTML = found? 'Iframe loaded!' : 'Iframe not found!';
	before_load.appendChild(li);
})
callbacks.all().then(function(){
	var li = document.createElement('li');
	li.innerHTML = 'All loaded!';
	before_load.appendChild(li);

	(function(){
		var after_load = document.getElementById('after_load');
		var callbacks2 = jQuery('body').prsWaitMediaFiles();
		callbacks2.image().then(function(found){
			var li = document.createElement('li');
			li.innerHTML = found? 'Images loaded!' : 'Images not found!';
			after_load.appendChild(li);
		})
		callbacks2.audio().then(function(found){
			var li = document.createElement('li');
			li.innerHTML = found? 'Audio loaded!' : 'Audio not found!';
			after_load.appendChild(li);
		})
		callbacks2.video().then(function(found){
			var li = document.createElement('li');
			li.innerHTML = found? 'Video loaded!' : 'Video not found!';
			after_load.appendChild(li);
		})
		callbacks2.iframe().then(function(found){
			var li = document.createElement('li');
			li.innerHTML = found? 'Iframe loaded!' : 'Iframe not found!';
			after_load.appendChild(li);
		})
		callbacks2.all().then(function(){
			var li = document.createElement('li');
			li.innerHTML = 'All loaded!';
			after_load.appendChild(li);
		});
	})();
});