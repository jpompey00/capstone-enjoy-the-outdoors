"use strict";


//array of generated images to use for the site
const images = ["park00.png", "park01.png","park02.png","park03.png",
"park04.png","park05.png","park06.png","park07.png","park08.png","park09.png",
"park10.png","park11.png","park12.png", "wizardkickflip.png"];


const locationDropDown = document.getElementById("locationDropDown");
const parkTypeDropDown = document.getElementById("parkTypeDropDown");


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

    theOption = new Option("View All", "View All");
    locationDropDown.appendChild(theOption);
    theOption = new Option("View All", "View All");
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

//updates the output of the site based on the filter
function updateOutput() {
    outputDiv.innerHTML = "";
    
    let filteredParks = filterParks();
    for (let nationalPark of filteredParks) {
        let random = Math.floor(Math.random() * (images.length))
        let address = formatAddress(nationalPark);

        createCard( `images/park-images/edited-images/${images[random]}` , nationalPark.LocationID, nationalPark.LocationName, address, nationalPark.LocationID,

        );

    }
}



function onLocationCheckboxClicked() {
    updateOutput();

    //disables the box if the checkbox isn't checked
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


//Filters the park based on the filters selected
//Has the ability to check by one or both.
function filterParks() {

    let nationalParks = nationalParksArray;

    if (locationCheckbox.checked) {
        if(locationDropDown.value != "View All" && locationDropDown.value != ""){
            nationalParks = nationalParks.filter((park) => park.State == locationDropDown.value);
        } 
    }

    if (parkTypeCheckbox.checked) {
        if(parkTypeDropDown.value != "View All" && parkTypeDropDown.value != ""){
            
            nationalParks = nationalParks.filter((park) => park.LocationName.includes(parkTypeDropDown.value));
        }
    }

    // console.log(nationalParks);
    if((locationCheckbox.checked && locationDropDown.value != "" )|| (parkTypeCheckbox.checked && parkTypeDropDown.value != "" )){
            // console.log("returning");
        return nationalParks;
    } else {
        // console.log("not retuning")
        return [];
    }
}



//creates the card. 
//Concept I want to focus on is the data attribute I used with the html
//Element to pass information from the HTML to the script
function createCard(imageUrl, id, title, mainText, footerText) {
 
    let colDiv = document.createElement("div");
    colDiv.classList.add("col-4", "my-4");
  
    
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "text-bg-dark", "image-hover");
    cardDiv.dataset.bsToggle = "modal";
    cardDiv.id = id;
    cardDiv.setAttribute("data-img-url", imageUrl);


    //The normal way of onclicking didn't work, so I used the HTML event instead of the
    //javascript. But because the images were randomly assigned in a different function
    //I had no way to get that image and display it through HTML, because cards were being
    //created dynamically.
    //The solution I found was using a data attribute, whos purpose is to pass specified
    //data from the HTML. So i used a data attribute named "data-img-url"
    //Then passe dit into the edit modal function to get the path for that image.
    cardDiv.setAttribute("onClick", "editModal(this.id, this.getAttribute('data-img-url'))");


    cardDiv.dataset.bsTarget = "#informationModal";
    let image = document.createElement("img");
    image.classList.add("card-img");
    let cardImgOverlayDiv = document.createElement("div");
    cardImgOverlayDiv.classList.add("card-img-overlay", "cardGradient", "d-flex", "flex-column",
        "justify-content-end"
    );

    let cardTitleH5 = document.createElement("h5");
    cardTitleH5.classList.add("card-title");
    
    let mainCardText = document.createElement("p");
    mainCardText.classList.add("card-text");
    
    let footerCardText = document.createElement("p");
    footerCardText.classList.add("card-text");
   

   //values to edit
    image.src = imageUrl;
    cardTitleH5.innerHTML = title;
    mainCardText.innerHTML = mainText;
    footerCardText.innerHTML = footerText;

    

    
    colDiv.appendChild(cardDiv);
    cardDiv.appendChild(image);
    cardDiv.appendChild(cardImgOverlayDiv);
    cardImgOverlayDiv.appendChild(cardTitleH5);
    cardImgOverlayDiv.appendChild(mainCardText);
    cardImgOverlayDiv.appendChild(footerCardText);



    outputDiv.appendChild(colDiv);
}



//Edits the modal from the page.
//These parameters come from the HTML and this script isn't called in the javascript
function editModal(id, imgUrl) {


    for (let nationalPark of nationalParksArray) {
        if (nationalPark.LocationID == id) {
            
            modalTitle.innerHTML = nationalPark.LocationName;

            modalImage.src = imgUrl;

            //some values have the address phone number or fax set to 0, so these Ternary Operators handle those situations.
            modalAddress1.innerHTML = nationalPark.Address == 0 ? formatAddress(nationalPark) : nationalPark.Address;
            modalAddress2.innerHTML = nationalPark.Address == 0 ? "" : formatAddress(nationalPark);


            modalPhoneText.innerHTML = nationalPark.Phone == 0 ? "" : `Phone: ${nationalPark.Phone}`;
            modalFaxText.innerHTML = nationalPark.Fax == 0 ? "" : `Fax ${nationalPark.Fax}`;

            modalLatitudeAndLongitudeText.innerHTML = `${convertDdToDms(nationalPark.Latitude, true)}, ${convertDdToDms(nationalPark.Longitude, false)}`
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


//opens the link to the new page when button is clicked
function onVisitLinkButtonClicked() {
    if (visitLink != undefined) {
        window.open(visitLink, "_blank");
    } else {
        console.log("no link");
    }
}

//formats the output for the address
function formatAddress(nationalPark) {
    //the last expression contains a ternary operator that will leave out the zipcode if its 0
    return `${nationalPark.City}, ${nationalPark.State} ${nationalPark.ZipCode == 0 ? "" : nationalPark.ZipCode}`
}


//converts the longitude and latitude from the DD system to the DMS system for display on the Modal
function convertDdToDms(DMM, Lat) {

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






