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


/*
TODO:

Add the part of the modal that will show the time.
Maybe make it blink
*/

window.onload = function () {
    loadDropDown();
   
    //parseSunriseSunset();

}



function loadDropDown() {


    for (let mountain of mountainsArray) {
        createListingCard(mountain);
    }
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
async function editModal(id) {

    for (let mountain of mountainsArray) {
        if (mountain.name == id) {
            
            modalTitle.innerHTML = mountain.name;

            modalImage.src = `images/${mountain.img}`;


            modalDescription.innerHTML = mountain.desc;
            modalElevation.innerHTML = `Elevation: ${mountain.elevation}`;
            modalEffort.innerHTML = `${mountain.effort}`;
            
            //changes color
            if(modalEffort.innerHTML == "Strenuous"){
                modalEffort.classList.remove("text-success");
                modalEffort.classList.add("text-danger", "fs-3");
            } else {
                modalEffort.classList.add("text-success");
                modalEffort.classList.remove("text-danger", "fs-3");
            }
            modalLatitudeAndLongitudeText.innerHTML = `${convertDmmToDms(mountain.coords.lat, true)}, 
            ${convertDmmToDms(mountain.coords.lng, false)}`;

            //analyze how this works so i can explain it
            //put these in a try catch block
            let data = await getSunsetForMountain(mountain.coords.lat, mountain.coords.lng)
            //WHY DONT THIS????

            let sunrise = data.results.sunrise;
            let sunset = data.results.sunset;

            modalSunriseSunset.innerHTML = `Sunrise: ${sunrise} Sunset: ${sunset}`;

            let isCloserToSunsetResult = isCloserToSunset(sunrise, sunset);

            if(isCloserToSunsetResult[0] == true){
                modalHoursUntilSunset.innerHTML = `${isCloserToSunsetResult[1]} hours until Sunset`;
                modalBackgroundDiv.classList.remove("sunrise-gradient");
                modalBackgroundDiv.classList.add("sunset-gradient")
                // modalBackgroundDiv.classList.add("night-time-gradient");
                //change the background color of the modal here

                //when it's closer to sunset, have the modal have the background color
                //with a gradient that's more night themed

            } else {
                modalHoursUntilSunset.innerHTML = `${isCloserToSunsetResult[1]} hours until Sunrise`;

                modalBackgroundDiv.classList.remove("sunset-gradient");
                modalBackgroundDiv.classList.add("sunrise-gradient")
                //change the backgrounc olor of the modal here
                //when its closer to sunrise, have the modal have the background color
                //with a day themed gradient

            }
        }
    }

}



function isCloserToSunset(sunrise, sunset) {

    //whichever difference is smaller will be what you're closer too?
    //will there ever be a situation where the sunrise will be bigger than the current?

    //Do it in the absolute value for both of them, 
    //the difference is what you're closer to

    //have it return true or false, call it closerToSunset.
    //make a catch for it being equal if that ever happens ever. later
    let hoursUntil;

    let sunriseDate = convertTo24Hours(sunrise).getTime();
    let sunriseHours = convertTo24Hours(sunrise).getHours()
    let sunsetDate = convertTo24Hours(sunset).getTime();
    let sunsetHours = convertTo24Hours(sunset).getHours();
    let currentDate = new Date().getTime();
    let currentHours = new Date().getHours();
    //means its closer to the sunset
    if (Math.abs(currentDate - sunriseDate) > Math.abs(currentDate - sunsetDate)) {
        hoursUntil= Math.abs(currentHours-sunsetHours);
        return [true, hoursUntil]
    } else {
        hoursUntil = Math.abs(currentHours - sunriseHours);
        return [false, hoursUntil]
    }

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

//put this in its own script for API calls
async function getSunsetForMountain(lat, lng) {
    let response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}



