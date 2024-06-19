const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

let date = new Date().getDate();
date = date < 10 ? '0' + date : date;
let month = monthNames[new Date().getMonth()];
let queryDate = date+'-'+month;

const getQuote = async () => {
	let response;
	try{
	 	response = await fetchQuoteByDate(queryDate);
	}catch(err){
		return;
	}
	
	if(response.status==200){
		let data = await response.json();
		document.querySelector("#quote").innerHTML = "\""+data['quote']+"\"";
		document.querySelector("#author").innerHTML = "- "+data['author'];
	}
};
getQuote();
