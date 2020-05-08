$(document).ready(function() { 
	$("#navbar").append(navbar)
})

$(document).on('click','#learn', function(){
	window.location.href = "./learn.html"
})

$(document).on('click','#quiz', function(){
	window.location.href = "./practice.html"
})