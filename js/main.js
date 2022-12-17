/* 
     ______ __                 __        
    |      |  |.-----.--.--.--|  |.--.--.
    |   ---|  ||  _  |  |  |  _  ||  |  |
    |______|__||_____|_____|_____||___  |
    Version 1.0 - By SkyX [ID FR] |_____|©
    2022-2023

*/
"use strict";

/* 👉 Indicate console.log starting'app : */
console.clear();
console.log("%c  Cloudy© is starting ! ✨  ", "border-radius: 10px; padding-top: 3px; padding-bottom: 6px; color: white; font-size: 14px; background-color: green");

/* 🌐 Geolocation of web'client : 🌐 */
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        /* Set latitude and longitude : */
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        /* Request with these parameters to the gep.api.gouv.fr API : */
        fetch(`https://geo.api.gouv.fr/communes?lat=${lat}&lon=${lng}`)
        .then(response => !response.ok ? Promise.reject() : response.json())
        .then(json => console.log("Votre ville actuelle 👉 " + json[0].nom))
        .catch(error => console.log(error))
    });
}