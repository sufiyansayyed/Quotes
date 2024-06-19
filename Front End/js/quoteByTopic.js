let topicList;
let currentTopic;


const getTopicsList = async () => {
	let response;
	let reload = document.querySelector("#reload");
	reload.style.visibility="hidden";
	try{
		response = await fetchListOfTopics();
	}catch(err){
		return;
	}
	reload.style.visibility="visible";
	if(response.status==200){
		topicList = await response.json();
		currentTopic = topicList[0];
		createTopicButtons();
		fetchQuoteForTopic();
	}
};

const createTopicButtons = () =>{
	let footerButtonListDiv = document.querySelector("#footerButtonList");
	footerButtonListDiv.innerHTML = '';
	for(let topic of topicList){
		let btn = document.createElement("button");
		btn.className = "footerButton";
		btn.innerHTML = topic;
		btn.onclick = function() {
			currentTopic = topic;
			fetchQuoteForTopic();
		};
		footerButtonListDiv.appendChild(btn);
	}
}

const fetchQuoteForTopic = async () => {
	let response;
	let topic = document.querySelector("#topic");
	let quote = document.querySelector("#quote");
	let author = document.querySelector("#author");
	let reload = document.querySelector("#reload");
	try{
		response = await fetchSingleQuoteOnTopic(currentTopic);
	}catch(err){
		quote.innerHTML = "Opps!! unable to load the quote.";
		topic.innerHTML = "";
		author.innerHTML = "";
		reload.style.visibility="hidden";
		return;
	}
	
	if(response.status==200){
		reload.style.visibility="visible";
		let data = await response.json();
		document.querySelector("#topic").innerHTML = data['topic'];
		document.querySelector("#quote").innerHTML = "\""+data['quote']+"\"";
		document.querySelector("#author").innerHTML = "- "+data['author'];
	}
} 

document.querySelector("#reload").addEventListener("click",function(){fetchQuoteForTopic()});

getTopicsList();