"use strict";
//intellisense

//replace with query selector for fun.
const locationDropDown = document.getElementById("locationDropDown");
const parkTypeDropDown = document.getElementById("parkTypeDropDown");
const viewAllButton = document.getElementById("viewAllButton");

const locationOutputDiv = document.getElementById("locationOutputDiv");
const parkTypeOutputDiv = document.getElementById("parkTypeOutputDiv");

const outputDiv = document.getElementById("outputDiv");

const placeholderImageUrl = "images/park_images/placeholder.png";

window.onload = function () {
    loadDropDowns();
    locationDropDown.onchange = onLocationDropDownChanged;
    //parkTypeDropDown.onchange = onParkDropDownChanged;
    //viewAllButton.onclick = onViewAllButtonClicked;
    
}


function loadDropDowns() {

    let theOption = new Option("Select An Option", "");
    locationDropDown.appendChild(theOption);

    theOption = new Option("Select An Option", "");
    parkTypeDropDown.appendChild(theOption);

    for (let location of locationsArray) {
        theOption = new Option(location, location);
        locationDropDown.appendChild(theOption);
    }

    for (let parkType of parkTypesArray) {
        theOption = new Option(parkType, parkType);
        parkTypeDropDown.appendChild(theOption);
    }
}

function onViewAllButtonClicked(){
    locationOutputDiv.innerHTML = "";
    for(let nationalPark of nationalParksArray){
        let locationOutput = document.createElement("p");
        locationOutput .innerHTML = nationalPark.LocationName;
        locationOutputDiv.appendChild(locationOutput);
    }
}

function onLocationDropDownChanged() {

    outputDiv.innerHTML = "";
    for (let nationalPark of nationalParksArray) {
        if (nationalPark.State == locationDropDown.value) {
            // let locationOutput = document.createElement("p");
            // locationOutput.innerHTML = nationalPark.LocationName;
            // outputDiv.appendChild(locationOutput);
            let address = formatAddress(nationalPark);
            createCard(placeholderImageUrl,nationalPark.LocationName,address,nationalPark.LocationID,
                "placeholder"
            );
        }
    }

}

function onParkDropDownChanged() {
    
    parkTypeOutputDiv.innerHTML = "";
    for (let nationalPark of nationalParksArray) {

        if(nationalPark.LocationName.includes(parkTypeDropDown.value)){
            let paragraphOutput = document.createElement("p");
            paragraphOutput.innerHTML = nationalPark.LocationName;
            
            parkTypeOutputDiv.appendChild(paragraphOutput);
        }

    }
}


//god help me
function createCard(imageUrl, title, mainText, footerText, websiteUrl){
    // div col-4
    let colDiv = document.createElement("div");
    colDiv.classList.add("col-4");
    // div card text-bg-dark image-hover
    //TODO: ADD THE DATA-BS-TOGGLE AND TARGET AND POINT IT CORRECTLY
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "text-bg-dark", "image-hover");
    // img
    let image = document.createElement("img");
    image.classList.add("card-img"); 
    // div card-img-overlay
    let cardImgOverlayDiv = document.createElement("div");
    cardImgOverlayDiv.classList.add("card-img-overlay");
    // h5 -Title test
    let cardTitleH5 = document.createElement("h5");
    cardTitleH5.classList.add("card-title");
    // p - Card Text
    let mainCardText = document.createElement("p");
    mainCardText.classList.add("card-text");
    //p - Card Text
    let footerCardText = document.createElement("p");
    footerCardText.classList.add("card-text");
    //add something that tells users to click to learn more

    //values that I need to change.
    //TODO fix the size
    image.src = imageUrl;
    cardTitleH5.innerHTML = title;
    mainCardText.innerHTML = mainText;
    footerCardText.innerHTML = footerText;

    //add a check for the websiteUrl and make a button for it.

    //This is going to be awful :)
    //rowDiv.appendChild(colDiv);
    colDiv.appendChild(cardDiv);
    cardDiv.appendChild(image);
    cardDiv.appendChild(cardImgOverlayDiv);
    cardImgOverlayDiv.appendChild(cardTitleH5);
    cardImgOverlayDiv.appendChild(mainCardText);
    cardImgOverlayDiv.appendChild(footerCardText);

    

    outputDiv.appendChild(colDiv);
}


function createModal(){
    //div
    let modalDiv = document.createElement("div");
    modalDiv.classList("modal", "fade");
    modalDiv.tabIndex = "-1";
    modalDiv.id = "cardModal1";
    //div
    let modalDialogDiv = document.createElement("div");
    modalDialogDiv.classList("modal-dialog", "modal-x1");
    //div
    let modalContentDiv = document.createElement("div");
    modalContentDiv.classList("modal-content");
        //div
        let modalHeaderDiv = document.createElement("div");
        modalHeaderDiv.classList("modal-header", "border-0");
            //button
            let button = document.createElement("button");
            button.classList("btn-close");
            button.type = "button";
            //How does this work.
            //button.data-bs-dismiss = "modal";
        //div
        let modalBodyDiv = document.createElement("div");
        modalBodyDiv.classList("modal-body", "text-center", "pb-5");
            //div
            let containerDiv = document.createElement("div");
            containerDiv.classList("container");
                //div
                let rowDiv = document.createElement("div");
                rowDiv.classList("row", "justify-content-center");
                    //div
                        //h2
                        //div
                            //div
                            //div
                                //i
                            //div
                        //img
                        //button
                            //i



}


function formatAddress(nationalPark){
    return `${nationalPark.address}, ${nationalPark.city}, ${nationalPark.state}, ${nationalPark.zipcode}`
}