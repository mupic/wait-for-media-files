var before_load = document.getElementById('before_load');
jQuery('body').waitMediaFiles()
.image(function(exists){
	var li = document.createElement('li');
	li.innerHTML = exists? 'Images loaded!' : 'Images not found!';
	before_load.appendChild(li);
})
.audio(function(exists){
	var li = document.createElement('li');
	li.innerHTML = exists? 'Audio loaded!' : 'Audio not found!';
	before_load.appendChild(li);
})
.video(function(exists){
	var li = document.createElement('li');
	li.innerHTML = exists? 'Video loaded!' : 'Video not found!';
	before_load.appendChild(li);
})
.iframe(function(exists){
	var li = document.createElement('li');
	li.innerHTML = exists? 'Iframe loaded!' : 'Iframe not found!';
	before_load.appendChild(li);
})
.all(function(){
	var li = document.createElement('li');
	li.innerHTML = 'All loaded!';
	before_load.appendChild(li);

	(function(){
		var after_load = document.getElementById('after_load');
		jQuery('body').waitMediaFiles()
		.image(function(exists){
			var li = document.createElement('li');
			li.innerHTML = exists? 'Images loaded!' : 'Images not found!';
			after_load.appendChild(li);
		})
		.audio(function(exists){
			var li = document.createElement('li');
			li.innerHTML = exists? 'Audio loaded!' : 'Audio not found!';
			after_load.appendChild(li);
		})
		.video(function(exists){
			var li = document.createElement('li');
			li.innerHTML = exists? 'Video loaded!' : 'Video not found!';
			after_load.appendChild(li);
		})
		.iframe(function(exists){
			var li = document.createElement('li');
			li.innerHTML = exists? 'Iframe loaded!' : 'Iframe not found!';
			after_load.appendChild(li);
		})
		.all(function(){
			var li = document.createElement('li');
			li.innerHTML = 'All loaded!';
			after_load.appendChild(li);
		});
	})();
});

jQuery('body').waitMediaFiles()
.image(function(exists){
	console.log('image');
})
.audio(function(exists){
	console.log('audio');
})
.video(function(exists){
	console.log('video');
})
.iframe(function(exists){
	console.log('iframe');
})
.all(function(){
	console.log('all');
});