const quotebyDateURL = 'http://localhost:1234/quotes?date=';
const quotebyIdURL = 'http://localhost:1234/quotes?id=';
const listOfTopicsURL = 'http://localhost:1234/quotes/topics';
const quoteByTopicURL = 'http://localhost:1234/quotes/topics/';
const addUpdateAndDeleteQuoteURL = 'http://localhost:1234/quotes';


async function fetchQuoteByDate(date){
    return await fetch(quotebyDateURL+date);
} 

async function fetchQuoteById(id){
    return await fetch(quotebyIdURL+id);
} 

async function fetchListOfTopics(){
    return await fetch(listOfTopicsURL);
} 

async function fetchSingleQuoteOnTopic(topic){
    return await fetch(quoteByTopicURL+topic+'/single');
}

async function deleteQuote(id){
    return await fetch(addUpdateAndDeleteQuoteURL+'/'+id,{method: 'DELETE'});
}

async function patchQuoteByDate(date,header,body){
    return await fetch(addUpdateAndDeleteQuoteURL+'/'+date,
        {
            method: 'PATCH', 
            headers: header,
            body: JSON.stringify(body)
        }
    );
}

async function postQuote(header,body){
    return await fetch(addUpdateAndDeleteQuoteURL,
        {
            method: 'POST', 
            headers: header,
            body: JSON.stringify(body)
        }
    );
}
