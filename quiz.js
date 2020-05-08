$( function() {
    $( document ).tooltip();
});

var q = -1
var score = 0
var state = 0

var quiz_btn = $('<button type="button" class="btn mr-1 btn-success quiz_btn">')
quiz_btn.append("Take Quiz Again")

var learn_btn = $('<button type="button" class="btn mr-1 btn-success learn_btn">')
learn_btn.append("Review Food Groups")

var next_btn = $('<button type="button" class="btn mr-1 btn-success next_btn">')
next_btn.append("Next")

var questions = [
	{
		"question": "What food group should fill up most of your plate?<br> Drag a food from this group to your plate.",
		"answer": "vegetable"
	},
	{
		"question": "What food group should fill up 30% of your plate? <br> Drag a food from this group to your plate.",
		"answer": "grain"
	},
	{
		"question": "What food should fill up 20% of your plate? <br> Drag a food from this group to your plate.",
		"answer": "protein"
	},
	{
		"question": "What other food group is missing?  <br> Drag a food from this group to your plate.",
		"answer": "fruit"
	},
	{
		"question": "Time to make a new plate! <br> Add a food from the food group that also contains oats, cornmeal, and barley.",
		"answer": "grain"
	},
	{
		"question": "What food group is used to make bones, muscles, cartilage, skin, and blood? <br> Drag a food from this group to your plate.",
		"answer": "protein"
	},
	{
		"question": "What food group is a good source of fiber, potassium, vitamin C and folate? <br> Drag a food from this group to your plate.",
		"answer": "fruit"
	},
	{
		"question": "What other food group is missing from your plate? <br> Drag a food from this group to your plate.",
		"answer": "vegetable"
	},
	{
		"question": "Let's make a new plate! What group contains foods naturally low in fat, sodium, and calories? <br> Drag a food from this group to your plate.",
		"answer": "fruit"
	},
	{
		"question": "What food group is a good source of B vitamins that play a key role in metabolism? <br> Drag a food from this group to your plate.",
		"answer": "grain"
	},
	{
		"question": "What food group is a good source of Vitamin A and helps protect against infections? <br> Drag a food from this group to your plate.",
		"answer": "vegetable"
	},
	{
		"question": "What food group is used to make enzymes, hormones, and vitamins? <br> Drag a food from this group to your plate.",
		"answer": "protein"
	},
	{
		"question": "This is your last plate! <br> At least half of the foods you eat from this next group should be whole.",
		"answer": "grain"
	},
	{
		"question": "What food group contains foods that are a good source of fiber and potassium? <br> Drag a food from this group to your plate.",
		"answer": "fruit"
	},
	{
		"question": "What food group can help heal cuts and wounds and keep teeth and gums healthy? <br> Drag a food from this group to your plate.",
		"answer": "vegetable"
	},
	{
		"question": "What food group is missing? <br> Drag the last food item to complete your plate!",
		"answer": "protein"
	}
]



function newPlate() {
	$(".drag").remove()
	$(".food" ).each(function( index ) {
		for (var i = 4*index ; i < (4*index + 4); i++) {
			dict = foods[i]
			var col = $("<div class = 'col-md-3 drag'>")
			var image = $("<img class = 'img food'>")
			image.attr("id", dict["name"])
			if (dict["show"] == 1){			
				image.attr("title", formatName(dict["name"]))	
				image.attr("src", dict["image"])
				col.attr("id", dict["name"])
			} else {
				image.attr("src", 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Blank_button.svg/1200px-Blank_button.svg.png')
			}
			
			col.append(image)	
			$(this).append(col)
		}
	})
	updateDragDrop()
}

function updateScore(amount) {
	score += amount
	$("#score").html(score)
}

function endQuiz() {
	$(".question").html("You finished the quiz!")
	if (score < 48){
		body = ("Can you do better?")	
	} else {
		body = ("Wow! A perfect score!")
	}
	createAlert("success", "Your final score was <br>" + score + " out of 48.", body, quiz_btn, learn_btn)
}

$(document).on('click','.quiz_btn', function(){
	window.location.href = "./practice.html"
})

$(document).on('click','.learn_btn', function(){
	window.location.href = "./learn.html"
})

function nextQuestion(){
	state = 0
	q++
	if (q % 4 == 0){
		newPlate()
	} 
	if (q <= 15){
		$(".question").html(questions[q]["question"])
		deleteAlert()
	} else {
		endQuiz()
	} 
	
}
$(document).on('click','.next_btn', nextQuestion);

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
									dict["show"] = 0
									createAlert("success", "Correct (+3 points)", dict["correct"], next_btn)
									updateScore(3)
									$(this).draggable("destroy")
									return false
								} else {
									createAlert("danger", "Incorrect (-1 point)", dict["incorrect"], "")
									updateScore(-1)
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
	newPlate()
	updateDragDrop()
	nextQuestion()
    updateScore(0)
	$("#navbar").append(navbar)
	endQuiz()
}); 
