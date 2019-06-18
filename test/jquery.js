var before_load = document.getElementById('before_load');
jQuery('body').waitMediaFiles()
.image(function(found){
	var li = document.createElement('li');
	li.innerHTML = found? 'Images loaded!' : 'Images not found!';
	before_load.appendChild(li);
})
.audio(function(found){
	var li = document.createElement('li');
	li.innerHTML = found? 'Audio loaded!' : 'Audio not found!';
	before_load.appendChild(li);
})
.video(function(found){
	var li = document.createElement('li');
	li.innerHTML = found? 'Video loaded!' : 'Video not found!';
	before_load.appendChild(li);
})
.iframe(function(found){
	var li = document.createElement('li');
	li.innerHTML = found? 'Iframe loaded!' : 'Iframe not found!';
	before_load.appendChild(li);
})
.all(function(){
	var li = document.createElement('li');
	li.innerHTML = 'All loaded!';
	before_load.appendChild(li);

	(function(){
		var after_load = document.getElementById('after_load');
		jQuery('body').waitMediaFiles()
		.image(function(found){
			var li = document.createElement('li');
			li.innerHTML = found? 'Images loaded!' : 'Images not found!';
			after_load.appendChild(li);
		})
		.audio(function(found){
			var li = document.createElement('li');
			li.innerHTML = found? 'Audio loaded!' : 'Audio not found!';
			after_load.appendChild(li);
		})
		.video(function(found){
			var li = document.createElement('li');
			li.innerHTML = found? 'Video loaded!' : 'Video not found!';
			after_load.appendChild(li);
		})
		.iframe(function(found){
			var li = document.createElement('li');
			li.innerHTML = found? 'Iframe loaded!' : 'Iframe not found!';
			after_load.appendChild(li);
		})
		.all(function(){
			var li = document.createElement('li');
			li.innerHTML = 'All loaded!';
			after_load.appendChild(li);
		});
	})();
});