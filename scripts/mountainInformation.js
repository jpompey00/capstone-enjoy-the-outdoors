"use strict"

const mountainSearchDropdown = document.getElementById("mountainSearchDropdown");
const outputDiv = document.getElementById("outputDiv");

window.onload = function(){
    loadDropDown();
    //remember this tells the function to run 
    //when the event is detected
    mountainSearchDropdown.onchange = onMountainSearchDropdownChanged;
}


function loadDropDown(){
    let theOption = new Option("Select an Option", "");
    mountainSearchDropdown.appendChild(theOption);
    for (let mountain  of mountainsArray){
        theOption = new Option(mountain.name,mountain.name);
        mountainSearchDropdown.appendChild(theOption);
    }
}

function onMountainSearchDropdownChanged(){


    let mountainNameElement = document.createElement("p");
    let mountaintDescription = document.createElement("p");
    let mountainElevation = document.createElement("p");
    let otherMountainFacts = document.createElement("p");

    outputDiv.innerHTML = "";
    for(let mountain of mountainsArray){
        if(mountainSearchDropdown.value == mountain.name){
            mountainNameElement.innerHTML = mountain.name;
            mountaintDescription.innerHTML = mountain.desc;
            mountainElevation.innerHTML = mountain.elevation;
            console.log(mountain.coords.lat, mountain.coords.lng);
            
            //sets the sunrise and sunset
            getSunsetForMountain(
                mountain.coords.lat, mountain.coords.lng
            ).then(data => {
                otherMountainFacts.innerHTML = `Sunrise: ${data.results.sunrise}
                Sunset: ${data.results.sunset}`; 
            });
        

            outputDiv.appendChild(mountainNameElement);
            outputDiv.appendChild(mountaintDescription);
            outputDiv.appendChild(mountainElevation);
            outputDiv.appendChild(otherMountainFacts);
        }
    }
}



async function getSunsetForMountain(lat, lng){
    let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
   }