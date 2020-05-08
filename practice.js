$( function() {
    $( document ).tooltip();
});

var q = 0;
var state = 0;

var questions = [
	{
		"question": "Practice question: Add a vegetable to your plate.",
		"answer": "vegetable"
	}
]

var take_quiz_btn = $('<button type="button" class="btn mr-1 btn-success take_quiz_btn">')
take_quiz_btn.append("Start Quiz")

function loadFoods() {
	$(".food" ).each(function( index ) {
		for (var i = 2*index ; i < (2*index + 2); i++) {
			dict = foods[i]
			var col = $("<div class = 'col-md-6 drag'>")
			var image = $("<img class = 'img-fluid food'>")
			image.attr("id", dict["name"])
			image.attr("title", formatName(dict["name"]))	
			image.attr("src", dict["image"])
			col.attr("id", dict["name"])		
			col.append(image)	
			$(this).append(col)
		}
	})
	updateDragDrop()
}

$(document).on('click','.take_quiz_btn', function(){
	window.location.href = "./quiz.html"
})

function updateDragDrop() {
	$( ".drag" ).draggable({
			start: function(event, ui) {             
        		$('.tooltip').hide();             
     		}, 
			revert: function(valid_drop){
				if (state == 0){
					name = $(this).attr("id")
					if (valid_drop){
						for (i in foods){
							dict = foods[i]
							if (dict["name"] == name) {
								if (dict["category"] == questions[q]["answer"]){
									createAlert("success", "Correct", dict["correct"], take_quiz_btn)
									state = 1;
									$(this).draggable("destroy")
									return false
								} else {
									createAlert("danger", "Incorrect", dict["incorrect"], "")
									return true
								}
							}
						}
					} else {
						createAlert("danger", "Drag the item to the plate", "", "")
						return true
					}
				} else {
					return true
				}
			} 
		}); 
	    $( ".drop" ).droppable({ 
	    	accept: function(d) {
				name = d.attr("id")
				for (i in foods){
					dict = foods[i]
					if (dict["name"] == name) {
						if (dict["category"] == questions[q]["answer"]){
							return true
						} else {
							return true
						}
					}
				}
			}
	    });     

}

$(document).ready(function() { 
	$("#navbar").append(navbar)
    $(".question").html(questions[q]["question"]);
    var body = "Food items can be dragged to your plate. Try it!"
    createAlert("success", "Get Ready For the Quiz", body, "", "")
    loadFoods()
}); 