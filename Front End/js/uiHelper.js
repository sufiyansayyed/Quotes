const monthNamesShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let currentSelectedDate;

let deleteById = document.querySelector("#deleteById");
let updateByDate = document.querySelector("#updateByDate");
let addQuote = document.querySelector("#addNewQuote");
let deleteByIdInnerDiv = document.querySelector("#deleteByIdInnerDiv");
let updateByDateInnerDiv = document.querySelector("#updateByDateInnerDiv");
let addQuoteInnerDiv = document.querySelector("#addNewQuoteInnerDiv");
let formAreas =  document.querySelectorAll(".formArea");
let actionButtons =  document.querySelectorAll(".secondaryAction");

let deleteFooterButton = document.querySelector("#deleteByIdFooterButton");
let updateFooterButton = document.querySelector("#updateByDateFooterButton");
let addFooterButton = document.querySelector("#addNewQuoteFooterButton");
let deleteQuoteButton = document.querySelector("#deleteQuoteByIdButton");
let getQuoteByIdButton = document.querySelector("#getQuoteByIdButton");
let updateQuoteByDateButton = document.querySelector("#updateQuoteByDateButton");
let getQuoteByDateButton = document.querySelector("#getQuoteByDateButton");
let clearAddQuoteDataButton = document.querySelector("#clearAddQuoteDataButton");
let addQuoteButton = document.querySelector("#addQuoteButton");
let dateDropdown = document.querySelector("#dateSelect");
let monthDropdown= document.querySelector("#monthSelect");
let ipInput = document.querySelector("#idInput");


function cleanupAndSetVisibilityOfDivAndButton(divName){
    hideActionButtons();
    hideUnwantedDiv(divName);
    clearIdInput();
    resetDateInput();
    clearDivChildText(deleteByIdInnerDiv);
    clearDivChildText(updateByDateInnerDiv);
    clearDivChildText(addQuoteInnerDiv);
    clearDivChildInput(updateByDateInnerDiv);
    clearDivChildInput(addQuoteInnerDiv);
}

function hideUnwantedDiv(divName){
    formAreas.forEach((item)=>{
        if(item.id == divName){ 
            item.style.visibility="visible";
        }
        else{
            item.style.visibility="hidden";
        }
    });
}

function hideActionButtons(){
    actionButtons.forEach((item)=>{
        item.style.visibility="hidden";
    });
}

function clearIdInput(){
    ipInput.value = '';
}

function resetDateInput(){
    monthDropdown.value = 1;
    dateDropdown.value = 1;
    currentSelectedDate = '01-Jan';
}

function clearDivChildText(div){
    Array.from(div.children).forEach((item)=>{
        if(item.tagName == 'P'){
            item.innerHTML='';
        }
        if(item.id == 'idTopic'){
            let textNode = document.createTextNode("\u00A0");
            item.append(textNode);
        }
    });
}

function clearDivChildInput(div){
    Array.from(div.children).forEach((item)=>{
        item.value = '';
    });
}

function hideDeleteButton(){
    deleteQuoteButton.style.visibility = "hidden";
}

function resetValues(){
    for (let item of arguments){
        item.innerHTML = '';
    }
}

function populateMonthDropdown(){
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    for (let i=1;i<=monthNames.length;i++) {
        const option = document.createElement("OPTION");
        option.innerHTML = monthNames[i-1];
        option.value = i;
        monthDropdown.append(option);
    }
    monthDropdown.value = 1;
}

function populateDateDropdown() {
    const monthInt = parseInt(monthDropdown.value);
    let month = monthNamesShort[monthInt-1];
    //2024 was a leap year so feb will always have 29 dates in dropdown
    const days = new Date(2024, monthInt, 0).getDate(); 

    dateDropdown.innerHTML='';
    for (let date = 1; date <= days; date++) {
      const option = document.createElement("OPTION");
      option.innerHTML = date;
      option.value = date;
      dateDropdown.append(option);
    }
    dateDropdown.value = 1;
    currentSelectedDate = '01-'+month;
}

function hideUpdateButton(updateDateDropdown){
    let date = dateDropdown.value;
    let month = monthNamesShort[monthDropdown.value-1];
    date = date < 10 ? '0' + date : date;
    currentSelectedDate = date+'-'+month;
    
    if(updateDateDropdown==true){
        populateDateDropdown();
    }
    updateQuoteByDateButton.style.visibility="hidden";
}

deleteFooterButton.addEventListener("click",function(){cleanupAndSetVisibilityOfDivAndButton("deleteById")});
updateFooterButton.addEventListener("click",function(){cleanupAndSetVisibilityOfDivAndButton("updateByDate")});
addFooterButton.addEventListener("click",function(){cleanupAndSetVisibilityOfDivAndButton("addNewQuote")});

deleteQuoteButton.addEventListener("click",function(){deleteQuoteById()});
getQuoteByIdButton.addEventListener("click",function(){getQuoteById()});
updateQuoteByDateButton.addEventListener("click",function(){updateQuoteByDate()});
getQuoteByDateButton.addEventListener("click",function(){getQuoteByDate()});
clearAddQuoteDataButton.addEventListener("click",function(){clearDivChildInput(addQuoteInnerDiv);clearDivChildText(addQuoteInnerDiv)});
addQuoteButton.addEventListener("click",function(){addNewQuote()});

dateSelect.addEventListener("change",function(){hideUpdateButton()});
monthSelect.addEventListener("change",function(){hideUpdateButton(true)});
ipInput.addEventListener("keydown",function(){hideDeleteButton()});

populateMonthDropdown();
populateDateDropdown();