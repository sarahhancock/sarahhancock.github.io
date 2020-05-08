var navbar = `
<head>
  <style>
  .bold{
    font-weight: bold;
  }
  .black{
    color: black;
  }
  </style>
  <link rel="shortcut icon" href="./favicon.ico">
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</head>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="./index.html">Home</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="./learn.html"> Learn <span class="sr-only">(current)</span></a>
      </li>
    </ul>
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="./practice.html"> Take Quiz <span class="sr-only">(current)</span></a>
      </li>
    </ul> 
  </div>
</nav>
`

function createAlert(type, title, body, button1, button2){
	deleteAlert()
	var alert = $('<div class="alert" role="alert">')
	alert.addClass("alert-" + type)
	var msgTitle = $('<div class = "row" id = "msg-title">')
	msgTitle.append(title)
	var msgBody = $('<div class = "row" id = "msg-body">')
	msgBody.append(body)
	var btnRow = $('<div class = "row">')
	var btn1Col = $('<div class = "col">')
	var btn2Col = $('<div class = "col">')
	btn1Col.append(button1)
	btn2Col.append(button2)
	btnRow.append(btn1Col, btn2Col)
	alert.append(msgTitle, msgBody, btnRow)
	$("#alert-row").append(alert)
}

function deleteAlert(){
	$("#alert-row").empty()
}

var groups = [
    {
        "name": "Vegetables",
        "category": "vegetable",
        "percentage": 40,
        "facts": [
            "<span class = 'bold'>Any vegetable or 100% vegetable juice</span> counts as a member of the Vegetable Group",
            "Vegetables are important sources of <span class = 'bold'>vitamin A and vitamin C.</span>",
            "Vitamin A keeps <span class = 'bold'>eyes and skin healthy</span> and helps to <span class = 'bold'>protect against infections.</span>",
            "Vitamin C helps <span class = 'bold'>heal cuts and wounds</span> and keeps <span class = 'bold'>teeth and gums healthy.</span>"
        ]
    },
    {
        "name": "Protein",
        "category": "protein",
        "percentage": 20,
        "facts": [
            "<span class = 'bold'>Beans, peas, processed soy products, nuts, and seeds</span> are sources of protein." ,
            "The body uses protein to make <span class = 'bold'>bones, muscles, cartilage, skin, and blood.</span>",
            "<span class = 'bold'>enzymes, hormones, and vitamins.</span> are also made from protein."
        ]
    },
    {
        "name": "Fruits",
        "category": "fruit",
        "percentage": 10,
        "facts": [
            "<span class = 'bold'>Any fruit or 100% fruit juice </span> counts as part of the Fruit Group.",
            "Most fruits are naturally <span class = 'bold'>low in fat, sodium, and calories</span>.",
            "Adding fruit can help increase intake of <span class = 'bold'>fiber, potassium, vitamin C and folate</span>.",
            "For the best nutritional value, choose <span class = 'bold'>whole fruits</span> to get more fiber."
        ]
    },
    {
        "name": "Grains",
        "category": "grain",
        "percentage": 30,
        "facts": [
            "A grain is any food made from <span class = 'bold'>wheat, rice, oats, cornmeal, barley</span>, or another cereal grain.",
            "At least <span class = 'bold'>half</span> the grains you eat should be <span class = 'bold'>whole grains.</span>",
            "Grains are a good source of <span class = 'bold'>B vitamins</span>, which play a key role in <span class = 'bold'>metabolism</span>."
        ]
    }
]

var foods = [
	{
		"name": "broccoli",
		"category": "vegetable",
		"incorrect": "Oops! Broccoli is a vegetable. That is not the correct food group.",
		"correct": "Great job! Broccoli is a vegetable, and the correct food group is vegetables.",
		"fact": "Broccoli is a cruciferous vegetable that provides the body with a wide range of vitamins, minerals, and antioxidants. Studies have shown that antioxidants may help prevent the type of cell damage that leads to cancer.",
		"image": "https://media-public.canva.com/MACy94iCezg/5/thumbnail_large.png",
		"more": "https://www.medicalnewstoday.com/articles/266765",
		"show": 1
	},
	{
		"name": "tofu",
		"category": "protein",
		"incorrect": "Oops! Tofu is considered a source of protein. That is not the correct food group.",
		"correct": "Good job! Tofu is a source of plant-based protein, and the correct food group is protein.",
		"fact": "Tofu contains all nine essential amino acids that your body can't make on its own.",
		"image": "https://media-public.canva.com/fbbf4/MAD2ZGfbbf4/1/tl.png",
		"more": "https://www.webmd.com/food-recipes/benefits-tofu",
		"show": 1
	},
	{
		"name": "apple",
		"category": "fruit",
		"incorrect": "Not quite! An apple is a fruit. That is not the correct food group.",
		"correct": "Nice! An apple is a fruit, and the correct food group is fruits.",
		"fact": "Apples contain nutrients that may lower the risk of stroke.",
		"image": "https://media-public.canva.com/MAAiBPYHDEw/1/thumbnail.png",
		"more": "https://www.medicalnewstoday.com/articles/267290",
		"show": 1
	},
	{
		"name": "bread",
		"category": "grain",
		"incorrect": "Nope! Bread is a grain, and that is not the correct food group.",
		"correct": "Yes! Bread is a grain, and that is the correct food group.",
		"fact": "Bread made with sprouted grains is a good option. When a grain is sprouted, its nutrients become easier to digest and more available to the body for use. It can be a better source of protein, fiber, vitamin C, folate, and other nutrients.",
		"image": "https://media-public.canva.com/MADbTj18OuQ/1/thumbnail_large.png",
		"more": "https://www.medicalnewstoday.com/articles/295235",
		"show": 1
	},
	{
		"name": "rice",
		"category": "grain",
		"incorrect": "Not quite! Rice is a grain, and that is not the correct food group.",
		"correct": "Yes! Rice is a grain, and that is the correct food group.",
		"fact": "Rice is composed of carbs, with small amounts of protein and virtually no fat.",
		"image": "https://media-public.canva.com/MACe8BK4bR0/1/thumbnail_large.png",
		"more": "https://www.medicalnewstoday.com/articles/318699",
		"show": 1
	},
	{
		"name": "pinto beans",
		"category": "protein",
		"incorrect": "Oops! Beans are a protein source, and that is not the correct food group.",
		"correct": "Yes! Beans are a protein source, the correct food group is protein.",
		"fact": "Pinto beans contain lots of thiamine, iron, magnesium, potassium, and phosphorus.",
		"image": "https://media-public.canva.com/MADSadtKgjU/1/thumbnail_large.png",
		"more": "https://www.healthline.com/nutrition/pinto-beans-nutrition",
		"show": 1
	},
	{
		"name": "lentils",
		"category": "protein",
		"incorrect": "Not quite! Lentils are a protein source, and that is not the correct food group.",
		"correct": "Great job! Lentils are a protein source, and the correct food group is protein.",
		"fact": "Lentils resemble a tiny bean, grow in pods, and come in red, brown, black, and green varieties.",
		"image": "https://media-public.canva.com/MAChu8orG0I/1/thumbnail_large.png",
		"more": "https://www.medicalnewstoday.com/articles/297638",
		"show": 1
	},
	{
		"name": "pasta",
		"category": "grain",
		"incorrect": "Try again! Pasta is a grain, and that is not the correct food group.",
		"correct": "Yes! Pasta is a grain, and that is the correct food group.",
		"fact": "To make pasta-based meals more healthful, people should avoid rich, creamy sauces and high-calorie accompaniments and add more vegetables and lean proteins.",
		"image": "https://media-public.canva.com/MADT6nVlKKc/1/thumbnail_large.png",
		"more": "https://www.medicalnewstoday.com/articles/322564#is-pasta-healthy",
		"show": 1
	},
	{
		"name": "bulgur",
		"category": "grain",
		"incorrect": "Incorrect! Bulgur is a grain, and that is not the correct food group..",
		"correct": "Yes! Bulgur is a grain, and that is the correct food group.",
		"fact": "Bulgur is considered a whole grain, meaning that the entire wheat kernel — including the germ, endosperm and bran — is eaten.",
		"image": "https://media-public.canva.com/MAChuy_DLrw/1/thumbnail_large.png",
		"more": "https://www.healthline.com/nutrition/bulgur-wheat",
		"show": 1
	},
	{
		"name": "watermelon",
		"category": "fruit",
		"incorrect": "Incorrect! Watermelon is a fruit, and that is not the correct food group.",
		"correct": "Yes! Watermelon is a fruit, and that is the correct food group.",
		"fact": "Watermelon is around 90% water, which makes it useful for staying hydrated in the summer.",
		"image": "https://media-public.canva.com/MACy4eZcLCw/5/thumbnail_large.png",
		"more": "https://www.medicalnewstoday.com/articles/266886",
		"show": 1
	},
	{
		"name": "eggplant",
		"category": "vegetable",
		"incorrect": "Oh no! Eggplant is a vegetable, and that is not the correct food group.",
		"correct": "Great! Eggplant is a vegetable, and that is the correct food group.",
		"fact": "The fiber, potassium, vitamin C, vitamin B-6, and antioxidants in eggplants all support heart health.",
		"image": "https://media-public.canva.com/MACy4bQBdYA/5/thumbnail_large.png",
		"more": "https://www.medicalnewstoday.com/articles/279359",
		"show": 1
	},
	{
		"name": "spinach",
		"category": "vegetable",
		"incorrect": "Oh no! Spinach is a vegetable. That is not the correct food group.",
		"correct": "Great! Spinach is a vegetable, and that is the correct food group.",
		"fact": "Dark, leafy greens like spinach are important for skin, hair, and bone health. They also provide iron, vitamins, and minerals.",
		"image": "https://media-public.canva.com/knxaw/MAD2Uwknxaw/1/tl.png",
		"more": "https://www.medicalnewstoday.com/articles/270609",
		"show": 1
	},
	{
		"name": "strawberry",
		"category": "fruit",
		"incorrect": "Incorrect! Stawberries are fruits. That is not the correct food group.",
		"correct": "Yes! Stawberries are fruits, and that is the correct food group.",
		"fact": "Strawberries might have a preventive effect against heart disease due to their high polyphenol content. Polyphenols are plant compounds that are good for the body.",
		"image": "https://media-public.canva.com/MAC3CcI-C-w/1/thumbnail_large.png",
		"more": "https://www.medicalnewstoday.com/articles/271285",
		"show": 1
	},
	{
		"name": "edamame",
		"category": "protein",
		"incorrect": "Incorrect! Edamame is a protein source, and it is recommended that protein makes up 20% of your plate.",
		"correct": "Nice! Edamame is a protein source, and the correct food group is protein.",
		"fact": "Edamame are immature soybeans with a sweet and slightly grassy taste. They need to be steamed or boiled prior to consumption and can be eaten on their own or added to soups and salads.",
		"image": "https://media-public.canva.com/MADVouzfm-Y/1/thumbnail_large.png",
		"more": "https://www.medicalnewstoday.com/articles/280285",
		"show": 1
	},
	{
		"name": "pear",
		"category": "fruit",
		"incorrect": "Incorrect! Pears are fruits. That is not the correct food group.",
		"correct": "Yes! Pears are fruits, and that is the correct food group.",
		"fact": "Pears are rich in essential antioxidants, plant compounds, and dietary fiber.",
		"image": "https://media-public.canva.com/MADnByjrPr4/1/thumbnail_large.png",
		"more": "https://www.medicalnewstoday.com/articles/285430",
		"show": 1
	},
	{
		"name": "carrot",
		"category": "vegetable",
		"incorrect": "Oh no! Carrots are vegetables. That is not the correct food group.",
		"correct": "Great! Carrots are vegetables, and that is the correct food group.",
		"fact": "Carrots contain vitamin A, and a vitamin A deficiency may result in xerophthalmia, a progressive eye disease. Xerophthalmia can cause night blindness or difficulty seeing when levels of light are low.",
		"image": "https://media-public.canva.com/MACy95-zRSM/5/thumbnail_large.png",
		"more": "https://www.medicalnewstoday.com/articles/270191",
		"show": 1
	}
]

function formatName(name){
	return (name.charAt(0).toUpperCase() + name.slice(1))
}