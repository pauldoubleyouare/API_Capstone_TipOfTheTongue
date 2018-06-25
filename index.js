function enterMainContent() {
	$(".button.enterHere").on("click", function(){
		console.log("enterMainContent() ran");
		$("#startPage").hide();
		$("#mainContent").show();
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
         success: renderWordDetails,
         error: showWordError
	});
}


function getDataFromGiphyAPI(searchTerm, callback) {
	console.log("getDataFromGiphyAPI() ran");
	const giphyAPIkey = "E2G0ds6xGilsWofWW00ysSaG9QuWmfC3";
	let settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPIkey + "&q=" + searchTerm,
		"method": "GET",
		"headers": {
			"Cache-Control": "no-cache",
		},
		"success": renderGiphyImage,
		"error": showGiphyError
	}

	$.ajax(settings);
}


function renderWordDetails(wordsApiData) {
	console.log("renderWordDetails() ran");
	let status = wordsApiData.success;
	if (status == false) {
		$("#searchTermResults").html('Ahhh - someone sprayed water in the server room.');	
	} else if (!wordsApiData.results) {
			console.log("no definition");
			$("#wordDefinition").html("Can't find a definition for this one... try another word!")
	} else {
		let synonymsList = wordsApiData.results[0].synonyms;
		if (synonymsList == undefined) {
			$("#wordItself").html(wordsApiData.word);
			$("#wordDefinition").html(wordsApiData.results[0].definition);
			$("#wordSynonyms").html("Doh. Looks like we're out of ideas on this one.");
		} else {
			$("#wordItself").html(wordsApiData.word);
			$("#wordDefinition").html(wordsApiData.results[0].definition);
			$("#wordSynonyms").html(synonymsList.join(" "));
				};
	};
}
		
		

// function separateSynonyms(synonym){
// 	console.log(synonym);
// 	// for(let)
// 	let htmlSyn = "<ul><li>" + synonym.join("</li><li>") + "</li></ul>";
// 	return htmlSyn;
// }


function renderGiphyImage(giphyData){
	// console.log(giphyData.meta.status);
	// console.log(giphyData.meta.msg);

	let status = giphyData.meta.status;
	let responseMessage = giphyData.meta.msg;
	// let giphyUrlData = giphyData.data[0].images.original.url;

	if (giphyData.pagination.total_count == 0) {
		console.log("image undefined");
		$("#giphyResult").html(`<img src="https://github.com/pauldoubleyouare/API_Capstone_TipOfTheTongue/blob/master/116456-200.png?raw=true">`);
	} else $("#giphyResult").html(`<img src="${giphyData.data[0].images.original.url}">`);

	// if (status == 200) {
	// 	$("#giphyResult").html(`<img src="${giphyUrlData}">`);
	// } else if (status >= 400 && status <= 430) {
	// 	console.log("there was an error with Giphy search");
	// 	$("#giphyResult").html(`<img src="https://giphy.com/embed/9Y5BbDSkSTiY8">`)
	// };
// put in an image if there is no gif
}

function showWordError(jsonData) {
	console.log("there was an error with WordsAPI");

	$("#wordItself").html(" ");
	$("#wordDefinition").html("Hmm... are you sure that was a real word? (check the spelling and try again.)");
	$("#wordSynonyms").html(" ");
}


function showGiphyError(err) {
	console.log("there was a Giphy error");
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
	});
}



$(listenForSubmit);
$(enterMainContent);

