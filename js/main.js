/* 
     ______ __                 __        
    |      |  |.-----.--.--.--|  |.--.--.
    |   ---|  ||  _  |  |  |  _  ||  |  |
    |______|__||_____|_____|_____||___  |
    Version 1.0 - By SkyX [ID FR] |_____|©
    2022-2023

*/

/* 👉 Indicate console.log starting'app : */
"use strict";
console.clear();
console.log("%c  Cloudy© is starting ! ✨  ", "border-radius: 10px; padding-top: 3px; padding-bottom: 6px; color: white; font-size: 14px; background-color: green");

/* 📣 Loading wait function : 📣 */
document.getElementById("loader").style.display = "block";
document.getElementById("content_page").style.display = "none";

setTimeout(function() {
    document.getElementById("loader").style.display = "none";
    $("#content_page").fadeIn("3000");
}, 40);
/* 📣 End of Loading wait function 📣 */

let date_format = new Date();
let actual_date = date_format.toLocaleString('fr-FR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
document.getElementById("date-text").innerHTML = actual_date;

/* 🔗 Plan a few hours of weather (8) : 🔗 */
var actuel_hours = date_format.getHours();
function addHours(date_format, hours) {
    date_format.setHours(date_format.getHours() + hours);
    return date_format;
}

for (var i = 1; i < 9; i++) {
    var forescast_hours = actuel_hours + addHours(date_format, 1);
    document.getElementById("hours").innerHTML += `
        <td>
            ${forescast_hours}
        </td>
    `;
}

/* 🌐 Geolocation of web'client : 🌐 */
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        /* 🛑 To avoid making lots of requests in the test phase : 🛑 */
        document.getElementById("temp").innerHTML = "6";
        document.getElementById("city-name").innerHTML = "Vous êtes localisé aux alentours de Lyon";
        document.getElementById("humidity").innerHTML = "<img src='images_assets/weather-icons/droplet.svg' class='item-icons' alt='items-icons'/> 20 %";
        document.getElementById("wind").innerHTML = "<img src='images_assets/weather-icons/wind.svg' class='item-icons' alt='items-icons'/> 7,5 km/h";
        document.getElementById("precip").innerHTML = "<img src='images_assets/weather-icons/umbrella.svg' class='item-icons' alt='items-icons'/> 2.2 ml";

        /* ⛅ Get all weather's data in real-time (with WeatherStack API) : ⛅ */
        /* fetch(`http://api.weatherstack.com/current?access_key=ea53a24554aa77b7a528ad5253b75a91&query=${lat},${lng}`)
            .then((response) => {return response.json();})
            .then((data) => {
                document.getElementById("temp").innerHTML = data.current.temperature;
                document.getElementById("city-name").innerHTML = "Vous êtes localisé aux alentours de " + data.location.name;
                document.getElementById("humidity").innerHTML = "<img src='images_assets/weather-icons/droplet.svg' class='item-icons' alt='items-icons'/>" + data.current.humidity + " %";
                document.getElementById("wind").innerHTML = "<img src='images_assets/weather-icons/wind.svg' class='item-icons' alt='items-icons'/>" + data.current.wind_speed + " km/h";
                document.getElementById("precip").innerHTML = "<img src='images_assets/weather-icons/umbrella.svg' class='item-icons' alt='items-icons'/>" + data.current.precip + " ml";
            }) */

        /* 👓 Get all forecast weather's data : 👓 */
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=e83b3c4c08285bf87b99f9bbc0abe3f0`)
            .then((response) => {return response.json();})
            .then((data) => {
                for (var i = 1; i < 9; i++) {
                    document.getElementById("forescat").innerHTML += `
                        <td>
                            Temp : ${Math.round(data.hourly[i].temp - 273.15)} <br/>
                            Humidité : ${data.hourly[i].humidity} <br/>
                            Vent : ${data.hourly[i].wind_speed} <br/>
                            Météo : ${data.hourly[i].weather[0].description} <br/><br/>
                            <img src="http://openweathermap.org/img/wn/${data.hourly[i].weather[0].icon}@2x.png"/>
                        </td>
                    `;             
                }
            })
    });
}