"use strict"

const mountainSearchDropdown = document.getElementById("mountainSearchDropdown");
const outputDiv = document.getElementById("outputDiv");
const cardContainer = document.getElementById("cardContainer");

const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const modalElevation = document.getElementById("modalElevation");
const modalEffort = document.getElementById("modalEffort");
const modalLatitudeAndLongitudeText = document.getElementById("modalLatitudeAndLongitudeText");
const modalSunriseSunset = document.getElementById("modalSunriseSunset");
const modalHoursUntilSunset = document.getElementById("modalHoursUntilSunset");
const modalBackgroundDiv = document.getElementById("modalBackgroundDiv");



window.onload = function () {
    loadDropDown();


}



function loadDropDown() {

    for (let mountain of mountainsArray) {
        createListingCard(mountain);
    }
}



//Creates the card listing for the page
function createListingCard(mountain) {
    //div
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mask-custom", "p-3", "my-3", "cardListing");
    cardDiv.dataset.bsToggle = "modal";
    cardDiv.dataset.bsTarget = "#portfolioModal1";
    //sets the id of the card
    cardDiv.id = mountain.name;

    //had to set an onClick even through HTMLEvents, that would pass the id from the card 
    //to the function that changes the modal
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


//Edits the Modal that appears when a card is pressed
//The async call was needed so I could use the await operator
async function editModal(id) {
    for (let mountain of mountainsArray) {
        if (mountain.name == id) {

            modalTitle.innerHTML = mountain.name;

            modalImage.src = `images/${mountain.img}`;


            modalDescription.innerHTML = mountain.desc;
            modalElevation.innerHTML = `Elevation: ${mountain.elevation}`;
            modalEffort.innerHTML = `${mountain.effort}`;

            //changes the text color in the modal
            if (modalEffort.innerHTML == "Strenuous") {
                modalEffort.classList.remove("text-success");
                modalEffort.classList.add("text-danger", "fs-3");
            } else {
                modalEffort.classList.add("text-success");
                modalEffort.classList.remove("text-danger", "fs-3");
            }
            modalLatitudeAndLongitudeText.innerHTML = `${convertDdToDms(mountain.coords.lat, true)}, 
            ${convertDdToDms(mountain.coords.lng, false)}`;


            
            let isBeforeSunriseResult;
            //the try catch block is used here totry the API call from getSunsetForMountain.
            //if the call fails then it will throw an error but the program will keep running.
            try {

                //the await operator was needed here because the getSunset function can operate at the same time
                //as the rest of the program. This can lead to the program trying to get a value that doesn't exist yet
                //because the other function hasn't finished. 
                //The await operator stops this function until getSunSetForMountain finishes running to assign that
                //value to the data
                const data = await getSunsetForMountain(mountain.coords.lat, mountain.coords.lng)
                console.log(data);
                let sunrise = data.results.sunrise;
                let sunset = data.results.sunset;

                modalSunriseSunset.innerHTML = `Sunrise: ${sunrise} Sunset: ${sunset}`;
                isBeforeSunriseResult = isBeforeSunrise(sunrise, sunset);

            } catch (error) {

                console.log("Error calling API");

            }

            //changes the gradient based on what the current time of the browser is closer to.
            if (isBeforeSunriseResult[0] == true) {
                modalHoursUntilSunset.innerHTML = `${isBeforeSunriseResult[1]} hours until Sunrise`;
                modalBackgroundDiv.classList.remove("sunset-gradient");
                modalBackgroundDiv.classList.add("sunrise-gradient");


            } else {
                modalHoursUntilSunset.innerHTML = `${isBeforeSunriseResult[1]} hours until Sunset`;

    
                modalBackgroundDiv.classList.remove("sunrise-gradient");
                modalBackgroundDiv.classList.add("sunset-gradient");

            }
        }
    }

}


//checks the current time against the sunrise and sunset time gained from the API call
//returns wether it's closer to sunrise/sunset followed by the hours until.
//I have just realized this does not work :)
function isBeforeSunrise(sunrise, sunset) {
    let hoursUntil;


    let sunriseHours = convertTo24Hours(sunrise).getHours()
    let sunsetHours = convertTo24Hours(sunset).getHours();
    let currentHours = new Date().getHours();

    //TEST DATA
    //let currentHours = new Date(2024,5,24,16,0,0).getHours();
    

    if (currentHours <= sunriseHours) {
        
        hoursUntil = sunriseHours - currentHours;
        return [true, hoursUntil]
    } else if(sunriseHours < currentHours  && sunsetHours >= currentHours){
        hoursUntil = sunsetHours - currentHours;
        return [false, hoursUntil]
    } else if(currentHours > sunsetHours){
        hoursUntil = currentHours - sunriseHours;
        return [true, hoursUntil]
    }

}


//converts the latitue or longitude from the data that is in Decimal Degrees form
//to DMS form
function convertDdToDms(DD, Lat) {
    //Isolate whole number
    //keep decimal
    //repeat 2 more times.
    let direction;
    if (DD >= 0) {
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

    let degrees = Math.floor(DD);
    DD -= degrees;
    DD = DD * 60;
    let minutes = Math.floor(DD);
    DD -= minutes;
    DD = DD * 60;
    let seconds = Math.ceil(DD);
    return `${degrees}\u00B0${direction},${minutes}'${seconds}"`
}


//converts the time that comes from the API call to 24 hour time format.
//This was done because of how the time that came from it was formatted.
function convertTo24Hours(time) {
    let convertedTime = new Date();

    if (time.includes("AM")) {
        const [hours, minutes, seconds] = time.slice(0, 7).split(":").map(Number);
        convertedTime.setHours(hours, minutes, seconds, 0);

    } else if (time.includes("PM")) {
        const [hours, minutes, seconds] = time.slice(0, 7).split(":").map(Number);
        convertedTime.setHours(hours + 12, minutes, seconds, 0);
    }
    return convertedTime
}

//I am not sure if I should put this in its own script to keep API calls together.
//does this work
async function getSunsetForMountain(lat, lng) {
    let response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}



