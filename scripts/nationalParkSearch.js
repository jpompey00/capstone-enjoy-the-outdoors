"use strict";
//intellisense

//replace with query selector for fun.
const locationDropDown = document.getElementById("locationDropDown");
const parkTypeDropDown = document.getElementById("parkTypeDropDown");
const viewAllButton = document.getElementById("viewAllButton");

const locationOutputDiv = document.getElementById("locationOutputDiv");
const parkTypeOutputDiv = document.getElementById("parkTypeOutputDiv");


window.onload = function () {
    loadDropDowns();
    locationDropDown.onchange = onLocationDropDownChanged;
    parkTypeDropDown.onchange = onParkDropDownChanged;
    viewAllButton.onclick = onViewAllButtonClicked;
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

    locationOutputDiv.innerHTML = "";
    for (let nationalPark of nationalParksArray) {
        if (nationalPark.State == locationDropDown.value) {
            let locationOutput = document.createElement("p");
            locationOutput.innerHTML = nationalPark.LocationName;
            locationOutputDiv.appendChild(locationOutput);
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