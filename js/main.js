/* 
     ______ __                 __        
    |      |  |.-----.--.--.--|  |.--.--.
    |   ---|  ||  _  |  |  |  _  ||  |  |
    |______|__||_____|_____|_____||___  |
    Version 1.0 - By SkyX [ID FR] |_____|©
    2022-2023

*/
"use strict";

/* 📣 Loading wait function : 📣 */
document.getElementById("loader").style.display = "block";
document.getElementById("header").style.display = "none";
document.getElementById("hero_components").style.display = "none";

setTimeout(function() {
    document.getElementById("loader").style.display = "none";
    $("#header").fadeIn("slow");
    $("#hero_components").fadeIn("3000");
}, 2000);

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

        /* ⛅ Get all weather's data with WeatherStack API : ⛅ */
        fetch(`http://api.weatherstack.com/current?access_key=0a82bdc4c6628b5f968dd500d30a8857&query=${lat},${lng}`)
            .then((response) => {return response.json();})
            .then((data) => {
                /* console.log(data.current); */
                document.getElementById("temp").innerHTML = data.current.temperature;
                document.getElementById("city-name").innerHTML = "Vous êtes localisé aux alentours de " + data.location.name;
            })
    });
}