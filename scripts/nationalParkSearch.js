"use strict";
//intellisense

//replace with query selector for fun.
const locationDropDown = document.getElementById("locationDropDown");
const parkTypeDropDown = document.getElementById("parkTypeDropDown");
const viewAllButton = document.getElementById("viewAllButton");

const locationOutputDiv = document.getElementById("locationOutputDiv");
const parkTypeOutputDiv = document.getElementById("parkTypeOutputDiv");

const outputDiv = document.getElementById("outputDiv");

const locationCheckbox = document.getElementById("locationCheckbox");
const parkTypeCheckbox = document.getElementById("parkTypeCheckbox");


//modal elements
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalAddress1 = document.getElementById("modalAddress1");
const modalAddress2 = document.getElementById("modalAddress2");
const closeModalButton = document.getElementById("closeModalButton");
const visitLinkButton = document.getElementById("visitLinkButton");
const modalPhoneText = document.getElementById("modalPhoneText");
const modalFaxText = document.getElementById("modalFaxText");
const modalLocationIdText = document.getElementById("modalLocationIdText");
const modalLatitudeAndLongitudeText = document.getElementById("modalLatitudeAndLongitudeText");


let visitLink;



const placeholderImageUrl = "images/park_images/placeholder.png";

//TODO
/*

add comments
add pictures, clean up card code.
*/


window.onload = function () {
    visitLinkButton.style.display = "none";

    loadDropDowns();
    locationCheckbox.onclick = onLocationCheckboxClicked;
    parkTypeCheckbox.onclick = onParkTypeCheckboxClicked;

    locationDropDown.onchange = updateOutput;
    parkTypeDropDown.onchange = updateOutput;
    visitLinkButton.onclick = onVisitLinkButtonClicked;
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



function updateOutput() {
    outputDiv.innerHTML = "";
    let filteredParks = filterParks();
    for (let nationalPark of filteredParks) {

        let address = formatAddress(nationalPark);
        createCard(placeholderImageUrl, nationalPark.LocationID, nationalPark.LocationName, address, nationalPark.LocationID,
            "placeholder"
        );

    }
}


//could not reset the dropdown
function onLocationCheckboxClicked() {
    updateOutput();

    if (locationCheckbox.checked) {

        locationDropDown.removeAttribute('disabled');
    } else {

        locationDropDown.setAttribute("disabled", "");
    }
}

function onParkTypeCheckboxClicked() {
    updateOutput()

    if (parkTypeCheckbox.checked) {
        parkTypeDropDown.removeAttribute('disabled')
    } else {
        parkTypeDropDown.setAttribute("disabled", "");
    }
}



function filterParks() {

    let nationalParks = nationalParksArray;

    if (locationCheckbox.checked) {
        nationalParks = nationalParks.filter((park) => park.State == locationDropDown.value);
    }

    if (parkTypeCheckbox.checked) {
        nationalParks = nationalParks.filter((park) => park.LocationName.includes(parkTypeDropDown.value));
    }

    console.log(nationalParks);
    if(locationCheckbox.checked || parkTypeCheckbox.checked ){
            console.log("returning");
        return nationalParks;
    } else {
        console.log("not retuning")
        return [];
    }
}




//Needs to be prettied up
function createCard(imageUrl, id, title, mainText, footerText, websiteUrl) {
    // div col-4
    let colDiv = document.createElement("div");
    colDiv.classList.add("col-4", "my-4");
    // div card text-bg-dark image-hover
    //TODO: ADD THE DATA-BS-TOGGLE AND TARGET AND POINT IT CORRECTLY
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "text-bg-dark", "image-hover");
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
    cardImgOverlayDiv.classList.add("card-img-overlay", "cardGradient", "d-flex", "flex-column",
        "justify-content-end"
    );

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



//I FIGURED IT OUT
//check for when number is 0 or when Address is 0
function editModal(id) {

    console.log(id);
    for (let nationalPark of nationalParksArray) {
        if (nationalPark.LocationID == id) {
            modalTitle.innerHTML = nationalPark.LocationName;
            modalImage.src = placeholderImageUrl;


            modalAddress1.innerHTML = nationalPark.Address == 0 ? formatAddress(nationalPark) : nationalPark.Address;
            modalAddress2.innerHTML = nationalPark.Address == 0 ? "" : formatAddress(nationalPark);


            modalPhoneText.innerHTML = nationalPark.Phone == 0 ? "" : `Phone: ${nationalPark.Phone}`;
            modalFaxText.innerHTML = nationalPark.Fax == 0 ? "" : `Fax ${nationalPark.Fax}`;

            modalLatitudeAndLongitudeText.innerHTML = `${convertDmmToDms(nationalPark.Latitude, true)}, ${convertDmmToDms(nationalPark.Longitude, false)}`
            if (nationalPark.Visit != undefined) {
                visitLinkButton.style.display = "inline";
                visitLink = nationalPark.Visit;
            } else {
                visitLinkButton.style.display = "none";
                visitLink = undefined;
            }

        }
    }

}



function onVisitLinkButtonClicked() {
    if (visitLink != undefined) {
        window.open(visitLink, "_blank");
    } else {
        console.log("no link");
    }
}


function formatAddress(nationalPark) {
    return `${nationalPark.City}, ${nationalPark.State} ${nationalPark.ZipCode == 0 ? "" : nationalPark.ZipCode}`
}


function convertDmmToDms(DMM, Lat) {
    //Isolate whole number
    //keep decimal
    //repeat 2 more times.
    let direction;
    if (DMM >= 0) {
        if (Lat) {
            direction = "N";
        } else {
            direction = "E";
        }

    } else {
        if (Lat) {
            direction = "S";
        } else {
            direction = "W";
        }

    }

    let degrees = Math.floor(DMM);
    DMM -= degrees;
    DMM = DMM * 60;
    let minutes = Math.floor(DMM);
    DMM -= minutes;
    DMM = DMM * 60;
    let seconds = Math.ceil(DMM);
    return `${degrees}\u00B0${direction},${minutes}'${seconds}"`
}







// function onLocationDropDownChanged() {

//     outputDiv.innerHTML = "";
//     let filteredParks = filterParks()

//     for (let nationalPark of filteredParks) {

//         let address = formatAddress(nationalPark);
//         createCard(placeholderImageUrl, nationalPark.LocationID, nationalPark.LocationName, address, nationalPark.LocationID,
//             "placeholder"
//         );

//     }

// }

// function onParkDropDownChanged() {

//     outputDiv.innerHTML = "";
//     let filteredParks = filterParks();
//     for (let nationalPark of filteredParks) {



//         let address = formatAddress(nationalPark);
//         createCard(placeholderImageUrl, nationalPark.LocationID, nationalPark.LocationName, address, nationalPark.LocationID,
//             "placeholder"
//         );


//     }
// }