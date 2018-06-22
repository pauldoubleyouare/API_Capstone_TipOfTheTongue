function enterMainContent() {
	$(".button.enterHere").on("click", function(){
		console.log("enterMainContent() ran");
		$("#startPage").hide();
		$("#mainContent").show();
	});
}




function listenForSubmit() {
	console.log("listenForSubmit() ran");
	$("#searchWordForm").submit(function(event) {
		event.preventDefault();
		const searchTarget = $(event.currentTarget).find(".searchTermInput");
		const searchTerm = searchTarget.val();
		searchTarget.val("");
		getDataFromWordsAPI(searchTerm);
		getDataFromGiphyAPI(searchTerm, renderGiphyImage);
		console.log(searchTerm);
	});
}

function getDataFromWordsAPI(searchTerm) {
	console.log("getDataFromWordsAPI() ran");
    let wordsUrlString = 'https://wordsapiv1.p.mashape.com/words/' + searchTerm;
	$.ajax({
         url: wordsUrlString,
         headers: {"Content-Type": "application/json",
		    "X-Mashape-Key": "gigqMWCafwmsh8oYF3J3SBirgRJ2p1eyOV9jsnXXJ4eU9u8AVL",
		    "Cache-Control": "no-cache",
		    "Postman-Token": "0fdf7317-51ec-4ff3-88e0-522e6becd66e"
         },
         success: renderWordDetails
	}).fail(showError());
}

function getDataFromGiphyAPI(searchTerm, callback) {
	console.log("getDataFromGiphyAPI() ran");
	const giphyUrlString = "https://api.giphy.com/v1/gifs/search";
	const giphyRequest = {
		api_key: "E2G0ds6xGilsWofWW00ysSaG9QuWmfC3",
		q: searchTerm,
		limit: 1
	};
	$.getJSON(giphyUrlString, giphyRequest, callback).fail(showError());

}




function renderGiphyImage(giphyData){
	$("#giphyResult").html(`
		<img src="${giphyData.data[0].images.original.url}">

		`)

}

function renderWordDetails(jsonData) {
	console.log("renderWordDetails() ran")
	$("#searchTermResults").html(`
			<div id="wordItself">${jsonData.word}</div>
			<div id="wordDefinition">${jsonData.results[0].definition}</div>
			<div id="wordPronunciation">${jsonData.pronunciation.all}</div>
			<div id="wordSynonyms">${jsonData.results[0].synonyms}</div>

	`);

}

function showError() {
	console.log("showError() ran");
}


// function displayWordDetails(data) {
// 	console.log("displayWordDetails() ran");
// 	const wordDetails = data.results.map((item) => renderWordDetails(item));
// 	$("#searchTermResults").html(wordDetails);

// }


function showError() {
	$("#searchTermResults").html("Error");
}





$(listenForSubmit);
$(enterMainContent);

