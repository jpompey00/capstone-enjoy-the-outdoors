"use strict"

const mountainSearchDropdown = document.getElementById("mountainSearchDropdown");
const outputDiv = document.getElementById("outputDiv");
const cardContainer = document.getElementById("cardContainer");

const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalTextBox = document.getElementById("modalTextBox");
/*
TODO:
Format the modal
Style the site more
Add the part of the modal that will show the time.
Maybe make it blink
*/

window.onload = function () {
    loadDropDown();

}


function loadDropDown() {


    for (let mountain of mountainsArray) {
        createListingCard(mountain);
    }
}

function onMountainSearchDropdownChanged() {


    let mountainNameElement = document.createElement("p");
    let mountaintDescription = document.createElement("p");
    let mountainElevation = document.createElement("p");
    let otherMountainFacts = document.createElement("p");

    cardContainer.innerHTML = "";
    // for(let mountain of mountainsArray){
    //     if(mountainSearchDropdown.value == mountain.name){
    //         mountainNameElement.innerHTML = mountain.name;
    //         mountaintDescription.innerHTML = mountain.desc;
    //         mountainElevation.innerHTML = mountain.elevation;
    //         console.log(mountain.coords.lat, mountain.coords.lng);


    //         getSunsetForMountain(
    //             mountain.coords.lat, mountain.coords.lng
    //         ).then(data => {
    //             otherMountainFacts.innerHTML = `Sunrise: ${data.results.sunrise}
    //             Sunset: ${data.results.sunset}`; 
    //         });


    //         outputDiv.appendChild(mountainNameElement);
    //         outputDiv.appendChild(mountaintDescription);
    //         outputDiv.appendChild(mountainElevation);
    //         outputDiv.appendChild(otherMountainFacts);
    //     }
    // }
}


function createListingCard(mountain) {
    //div
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mask-custom", "p-3", "my-3", "cardListing");
    cardDiv.dataset.bsToggle = "modal";
    cardDiv.dataset.bsTarget = "#portfolioModal1";
    cardDiv.id = mountain.name;
    cardDiv.setAttribute("onClick", "editModal(this.id)")
    //div
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    //div
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row", "justify-content-center");
    //div  
    const colDiv1 = document.createElement("div");
    colDiv1.classList.add("col");
    //img
    const image = document.createElement("img");
    image.src = `images/${mountain.img}`;
    //div
    const colDiv2 = document.createElement("div");
    colDiv2.classList.add("col-8");
    //div
    const textDiv = document.createElement("div");
    textDiv.classList.add("form-outline", "form-white");
    //p
    const h1 = document.createElement("p");
    h1.classList.add("h1", "font-weight-bold", "mb-4", "text-white");
    h1.innerHTML = mountain.name;
    //p
    const paragraph1 = document.createElement("p");
    paragraph1.classList.add("text-white");
    paragraph1.innerHTML = mountain.desc;

    cardDiv.appendChild(cardBodyDiv);
    cardBodyDiv.appendChild(rowDiv);
    rowDiv.appendChild(colDiv1);
    colDiv1.appendChild(image);
    rowDiv.appendChild(colDiv2);
    colDiv2.appendChild(textDiv);
    textDiv.appendChild(h1);
    textDiv.appendChild(paragraph1);

    cardContainer.appendChild(cardDiv);
}


//this works
function editModal(id){
    for(let mountain of mountainsArray){
        if(mountain.name == id){
            modalTitle.innerHTML = mountain.name;
            modalTextBox.innerHTML = mountain.desc;
        }
    }

}



async function getSunsetForMountain(lat, lng) {
    let response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}