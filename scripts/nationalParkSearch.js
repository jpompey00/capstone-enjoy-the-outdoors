"use strict";
//intellisense

//replace with query selector for fun.
const locationDropDown = document.getElementById("locationDropDown");
const parkTypeDropDown = document.getElementById("parkTypeDropDown");
const viewAllButton = document.getElementById("viewAllButton");

const locationOutputDiv = document.getElementById("locationOutputDiv");
const parkTypeOutputDiv = document.getElementById("parkTypeOutputDiv");

const outputDiv = document.getElementById("outputDiv");

//modal elements
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalBodyText = document.getElementById("modalBodyText");
const closeModalButton = document.getElementById("closeModalButton");
const visitLinkButton = document.getElementById("visitLinkButton");



const placeholderImageUrl = "images/park_images/placeholder.png";

//TODO
/*
Format the output better
Pretty up the code
comment the work
add the logic behind choosing which filter or both.
Make so that you don't need to scroll on the site, and there will
Instead be a carousel type setup.
Maybe for smaller site turn it from a carousel into a listbox.
*/


window.onload = function () {
    loadDropDowns();
    locationDropDown.onchange = onLocationDropDownChanged;

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

function onViewAllButtonClicked() {
    locationOutputDiv.innerHTML = "";
    for (let nationalPark of nationalParksArray) {
        let locationOutput = document.createElement("p");
        locationOutput.innerHTML = nationalPark.LocationName;
        locationOutputDiv.appendChild(locationOutput);
    }
}

function onLocationDropDownChanged() {

    outputDiv.innerHTML = "";
    for (let nationalPark of nationalParksArray) {
        if (nationalPark.State == locationDropDown.value) {
            let address = formatAddress(nationalPark);
            createCard(placeholderImageUrl, nationalPark.LocationID, nationalPark.LocationName, address, nationalPark.LocationID,
                "placeholder"
            );
        }
    }

}

function onParkDropDownChanged() {

    parkTypeOutputDiv.innerHTML = "";
    for (let nationalPark of nationalParksArray) {

        if (nationalPark.LocationName.includes(parkTypeDropDown.value)) {
            let paragraphOutput = document.createElement("p");
            paragraphOutput.innerHTML = nationalPark.LocationName;

            parkTypeOutputDiv.appendChild(paragraphOutput);
        }

    }
}


//Needs to be prettied up
function createCard(imageUrl, id, title, mainText, footerText, websiteUrl) {
    // div col-4
    let colDiv = document.createElement("div");
    colDiv.classList.add("col-4");
    // div card text-bg-dark image-hover
    //TODO: ADD THE DATA-BS-TOGGLE AND TARGET AND POINT IT CORRECTLY
    let cardDiv = document.createElement("div");
    cardDiv.classList.add( "card", "text-bg-dark", "image-hover");
    cardDiv.dataset.bsToggle = "modal";
    cardDiv.id = id;
    cardDiv.setAttribute("onClick", "editModal(this.id)");
    //change this to a variable maybe
    cardDiv.dataset.bsTarget = "#informationModal";
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



//I FIGURED IT OUUUUUT AWOOOOOOOOOOOO
function editModal(id){ 

    console.log(id);
    for(let nationalPark of nationalParksArray){
        if(nationalPark.LocationID == id){
            modalTitle.innerHTML = nationalPark.LocationName;
            modalImage.src = placeholderImageUrl;
            modalBodyText.innerHTML = formatAddress(nationalPark);
        }
    }

}


function formatAddress(nationalPark) {
    return `${nationalPark.Address}, ${nationalPark.City}, ${nationalPark.State}, ${nationalPark.ZipCode}`
}




