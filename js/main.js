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
}, 1000);
/* 📣 End of Loading wait function 📣 */

let date_format = new Date();
let actual_date = date_format.toLocaleString('fr-FR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
document.getElementById("date-text").innerHTML = actual_date;

/* 🔗 Plan a few hours of weather (10) : 🔗 */
function addHoursToDate(hour){
    date_format.setHours(date_format.getHours() + hour);
    return date_format;
}

for (var i = 1; i < 11; i++) {
    document.getElementById("forescat_hours_inner").innerHTML += `
        <td><p class="daily-infos-text">${addHoursToDate(1).getHours()}h</p></td>
    `;
}

/* 💡 Forescast popup's showing effect : 💡 */
document.getElementById("forescast_popup").style.display = "none";
function hide_forestcast_popup() { $("#forescast_popup").fadeOut("3000"); }

function show_forestcast_popup(id_obj) { 
    $("#forescast_popup").fadeIn("3000"); 
    var id_final_obj = id_obj.id;

    /* ⏱ Dev an another loading function to load data in info's popup : ⏱ */
    document.getElementById("popup_loader").style.display = "block";
    document.getElementById("infos").style.display = "none";
    setTimeout(function() {
        document.getElementById("popup_loader").style.display = "none";
        $("#infos").fadeIn("1000");
    }, 1000);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=e83b3c4c08285bf87b99f9bbc0abe3f0`)
            .then((response) => {return response.json();})
            .then((data) => {
                document.getElementById("popup_temp").innerHTML = `
                    <p>${Math.round(data.hourly[id_final_obj].temp - 273.15)}</p>
                `;
            })
        }
    )}
}

/* 🌐 Geolocation of web'client : 🌐 */
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        
        /* 🏠 Find the user precisely geolocation : 🏠 */
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
            .then((response) => {return response.json();})
            .then((data) => {
                /* Voir pour peut-être afficher + d'infos ✨ */
                document.getElementById("city-name").innerHTML = "Vous êtes localisé aux alentours de " + data.address.municipality; 
            })

        /* 👓 Get ALL weather's data : 👓 */
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=e83b3c4c08285bf87b99f9bbc0abe3f0`)
            .then((response) => {return response.json();})
            .then((data) => {
                document.getElementById("temp").innerHTML = Math.round(data.current.temp - 273.15);
                document.getElementById("humidity").innerHTML = "<img src='images_assets/weather-icons/droplet.svg' class='item-icons' alt='items-icons'/>" + data.current.humidity + " %";
                document.getElementById("wind").innerHTML = "<img src='images_assets/weather-icons/wind.svg' class='item-icons' alt='items-icons'/>" + data.current.wind_speed + " km/h";
                document.getElementById("precip").innerHTML = "<img src='images_assets/weather-icons/umbrella.svg' class='item-icons' alt='items-icons'/> 0 ml";

                for (var i = 1; i < 11; i++) {
                    document.getElementById("forescat_info_inner").innerHTML += `
                        <td class="forescat_info_item" id=${i} onClick="show_forestcast_popup(this);">
                            <img src="http://openweathermap.org/img/wn/${data.hourly[i].weather[0].icon}@2x.png"/><br/>
                            <p class="temp">${Math.round(data.hourly[i].temp - 273.15)}<p class="celcus">°c</p></p>
                        </td>
                    `;             
                }
            })
    });
}