/* 
     ______ __                 __        
    |      |  |.-----.--.--.--|  |.--.--.
    |   ---|  ||  _  |  |  |  _  ||  |  |
    |______|__||_____|_____|_____||___  |
    Version 1.0 - By SkyX [ID FR] |_____|©
    2022-2023

*/
"use strict";

/* Todo : create a loading's wait function : */
document.getElementById("loader").style.display = "none";
document.getElementById("header").style.display = "block";
document.getElementById("hero_components").style.display = "block";

/* 👉 Indicate console.log starting'app : */
console.clear();
console.log("%c  Cloudy© is starting ! ✨  ", "border-radius: 10px; padding-top: 3px; padding-bottom: 6px; color: white; font-size: 14px; background-color: green");

let date = new Date();
let actual_date = date.toLocaleString('fr-FR',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'});

document.getElementById("date-text").innerHTML = actual_date;

/* 🌐 Geolocation of web'client : 🌐 */
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        /* 🏠 Request with these parameters to the geo.api.gouv.fr API : 🏠 */
        fetch(`https://geo.api.gouv.fr/communes?lat=${lat}&lon=${lng}`)
            .then(response => !response.ok ? Promise.reject() : response.json())
            /* .then (json => { console.log(json[0].nom); }) */
            .catch(error => console.log(error))

        /* ⛅ Get all weather's data with WeatherStack API : ⛅ */
        fetch(`http://api.weatherstack.com/current?access_key=0a82bdc4c6628b5f968dd500d30a8857&query=${lat},${lng}`)
            .then((response) => {return response.json();})
            .then((data) => {
                /* console.log(data); */     

                document.getElementById("temp").innerHTML = data.current.temperature;
                document.getElementById("city-name").innerHTML = data.location.name + "<br/><a href='https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API' target='_blank' class='more-infos'>En savoir + sur ma localisation</a>";
            })
    });
}