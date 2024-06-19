/////////////////////////////////////////////////
//
// Uses functions and variables from uiHelper.js
//
////////////////////////////////////////////////
async function getQuoteById () {
    let data;
    let response;
    let id = ipInput.value;
    let topic = deleteByIdInnerDiv.querySelector("#idTopic");
    let quote = deleteByIdInnerDiv.querySelector("#idQuote");
    let author = deleteByIdInnerDiv.querySelector("#idAuthor");

    resetValues(topic,quote,author);
    deleteQuoteButton.style.visibility="hidden";
    if(id!=''){
        try{
            response = await fetchQuoteById(id);
        }catch(err){
            topic.innerHTML = "Looks like there is some issue!!";
            return;
        }
        
        if(response.status==200){
            data = await response.json();
            topic.innerHTML = data['topic'];
            quote.innerHTML = "\""+data['quote']+"\"";
            author.innerHTML = "- "+data['author'];
            deleteQuoteButton.style.visibility="visible";
        }
        else if(response.status==400){
            topic.innerHTML = "Looks like there is some issue with the request!!";
        }
        else if(response.status==404){
            topic.innerHTML = "No Quotes found with id "+id+" !!";
        }
        else{
            topic.innerHTML = "Opps!! unable to load the quote.";
        }
    }else{
        topic.innerHTML = "Please enter valid ID !!";
    }

} 

async function deleteQuoteById(){
    let id = ipInput.value;
    let resultArea = deleteByIdInnerDiv.querySelector("#idTopic");
    let response;
	let data;
    try{
        response = await deleteQuote(id);
    }
    catch(err){
        resultArea.innerHTML = "Looks like there is some issue!!";
        return;
    }

    data = await response.text();
    clearDivChildText(deleteByIdInnerDiv);
	resultArea.innerHTML = data;
    hideDeleteButton();
    clearIdInput();
}

async function getQuoteByDate () {
    let topic = updateByDateInnerDiv.querySelector("#dateTopic");
    let quote = updateByDateInnerDiv.querySelector("#dateQuote");
    let author = updateByDateInnerDiv.querySelector("#dateAuthor");
    let result = updateByDateInnerDiv.querySelector("#updateByDateResponse");
    let response;
    let data;

    try{
        response = await fetchQuoteByDate(currentSelectedDate);
    }
    catch(err){
        result.innerHTML  = "Looks like there is some issue!!";
        return;
    }

    resetValues(topic,quote,author);
    clearDivChildText(updateByDateInnerDiv);
    updateQuoteByDateButton.style.visibility="hidden";
	if(response.status == 200){
		data = await response.json();
        topic.value = data['topic'];
		quote.value = data['quote'];
		author.value = data['author'];
        updateQuoteByDateButton.style.visibility="visible";
	}
    else if(response.status == 500){
        result.innerHTML = "Opps!! unable to load the quote.";
    }
    else{
        result.innerHTML = "No Quotes found to for "+currentSelectedDate+ " !!";
    }

} 

async function updateQuoteByDate() {
    let topic = updateByDateInnerDiv.querySelector("#dateTopic");
    let quote = updateByDateInnerDiv.querySelector("#dateQuote");
    let author = updateByDateInnerDiv.querySelector("#dateAuthor");
    let result = updateByDateInnerDiv.querySelector("#updateByDateResponse");

    let data;
    let response;
    let requestBody;
    let header = {'Content-type': 'application/json; charset=UTF-8'};

    if(topic.value != '' && quote.value != '' && author.value != ''){
        requestBody = {"topic":topic.value,"quote":quote.value,"author":author.value};
        try{
            response = await patchQuoteByDate(currentSelectedDate,header,requestBody);
        }catch(err){
            result.innerHTML  = "Looks like there is some issue!!";
            return;
        }
        
        if(response.status==200){
            data = await response.json();
            resetValues(topic,quote,author);
            result.innerHTML = "Quote updated for "+currentSelectedDate+" !!";
        }else if(response.status == 500){
            result.innerHTML = "Opps!! unable to load the quote.";
        }
        else {
            result.innerHTML = "No Quotes found for "+currentSelectedDate+" !!";
        }
        hideUpdateButton();
        clearDivChildInput(updateByDateInnerDiv);
    }else{
        result.innerHTML = "All fields are required !!";
    }
}

async function addNewQuote() {
    let result = addQuoteInnerDiv.querySelector("#addNewQuoteResponse");
    let topic = addQuoteInnerDiv.querySelector("#addTopic");
    let quote = addQuoteInnerDiv.querySelector("#addQuote");
    let author = addQuoteInnerDiv.querySelector("#addAuthor");

    let data;
    let response;
    let requestBody
    let header = {'Content-type': 'application/json; charset=UTF-8'};
    
    if(topic.value != '' && quote.value != '' && author.value != ''){
        requestBody = {"topic":topic.value,"quote":quote.value,"author":author.value};
        try{
            response = await postQuote(header,requestBody);
        }catch(err){
            result.innerHTML  = "Looks like there is some issue!!";
            return;
        }
        
        data = await response.text();
        resetValues(topic,quote,author);
        result.innerHTML = data;
        clearDivChildInput(addQuoteInnerDiv); 
    }else{
        result.innerHTML = "All fields are required !!";
    }
}
