google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

var quiz_btn = $('<button type="button" id = "quiz" class="btn btn-success">')
quiz_btn.append("Ready to take the quiz?")

function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'name');
  data.addColumn('number', 'percentage');
  data.addColumn('string', 'category')
  for (i in groups){
    dict = groups[i]
    data.addRow([dict['name'], dict['percentage'], dict['category']])
  }

  var options = {'width':560,
                  'height':560,
                  'chartArea': {'width': '100%', 'height': '80%'},
                  colors: ['#83c983', '#4eacfd', '#df706d', '#f1b25b'],
                  legend: {position: 'none'},
                  'tooltip' : {
                      trigger: 'none'
                  },
                  pieSliceText: 'label'
              };

  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);

  google.visualization.events.addListener(chart, 'select', selectHandler);
  
  function selectHandler(e) {
  var selectedItem = chart.getSelection()[0];
      if (selectedItem) {
        $("#food-name").html("")
        $("#food-fact").html("") 
        $("#food-more").html("") 
        var category = data.getValue(selectedItem.row, 2);
        $("#foods").empty()
        for (i in foods){
          dict = foods[i]
          if (dict["category"] == category) {
            col = $("<div class = 'col-md-2'>")
            image = $("<img class = 'img-fluid food'>")
            image.attr("src", dict["image"])
            image.attr("id", dict["name"])
            col.append(image)
            $("#foods").append(col)
          }
        }
        for (i in groups) {
          if (groups[i]["category"] == category) {
            $("#category").html(groups[i]["name"])
            $("#percentage").html(groups[i]["percentage"])
            $("#percentage").append("%")
            $("#information").empty()
            for (j in groups[i]["facts"]){
              var item = $("<li class = 'list-item'>")
              item.append(groups[i]["facts"][j])
              $("#information").append(item)
            }
          }
        }
        createAlert("light", "Click on each food item to learn more.", "", "", "")
      }
  }
}

$(document).on('click','#quiz', function(){
  window.location.href = "/practice"
})

$(document).on('click','.learn_more_btn', function(){
  var win = window.open($(this).attr("id"));
  if (win) {
      win.focus();
  } else {
      alert('Please allow popups for this website');
  }
})

$(document).on('click','.food', function(){
  name = $(this).attr("id")
  for (i in foods){
    dict = foods[i]
    if (dict["name"] == name){
      var learn_more_btn = $('<button type="button"  class="btn btn-outline-secondary learn_more_btn">')
      learn_more_btn.attr("id", dict["more"])
      learn_more_btn.append("Learn More")
      createAlert("light", formatName(name), dict["fact"], learn_more_btn, "")
    }
  }
})
$(document).ready(function() { 
  $(".quiz_button").append(quiz_btn)
})
