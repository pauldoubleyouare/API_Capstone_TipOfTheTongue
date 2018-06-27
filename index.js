function enterMainContent() {
	$(".button.enterHere").on("click", function(){
		console.log("enterMainContent() ran");
		$("#startPage").hide();
		$("#mainContent").show();
	});
}


/* Modal functions */

function handleModal() {
	console.log("handleModal() ran");
	let modal = $(".modal");
	let btn = $("#modalBtn");
	btn.on("click", function(){
		modal.show();
	});
}

function closeModal() {
	let modal = $(".modal");
	let closeBtn = $(".closeBtn");
	closeBtn.on("click", function(){
		modal.hide();
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
			// $("#wordItself").html(wordsApiData.word);
			$("#wordDefinition").html(wordsApiData.results[0].definition);
			$("#wordSynonyms").html("Doh. Looks like we're out of ideas on this one.");
		} else {
			// $("#wordItself").html(wordsApiData.word);
			$("#wordDefinition").html(wordsApiData.results[0].definition);
			$("#wordSynonyms").html(synonymsList.join(" "));
				};
	};
}
		
		




function renderGiphyImage(giphyData){
	// console.log(giphyData.meta.status);
	// console.log(giphyData.meta.msg);
	console.log("renderGiphyImage() ran")

	let status = giphyData.meta.status;
	let responseMessage = giphyData.meta.msg;
	// let giphyUrlData = giphyData.data[0].images.original.url;

	if (giphyData.pagination.total_count == 0) {
		console.log("image undefined");
		$("#giphyResult").html(`<img src="https://github.com/pauldoubleyouare/API_Capstone_TipOfTheTongue/blob/master/116456-200.png?raw=true">`);
	} else $("#giphyImage").attr("src", `${giphyData.data[0].images.original.url}`);
}

function showWordError(jsonData) {
	console.log("there was an error with WordsAPI");

	// $("#wordItself").html(" ");
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
		$("#wordItself").html(searchTerm);
		searchTarget.val("");
		getDataFromWordsAPI(searchTerm);
		getDataFromGiphyAPI(searchTerm, renderGiphyImage);
	});
}



$(listenForSubmit);
$(enterMainContent);
$(handleModal);
$(closeModal);

