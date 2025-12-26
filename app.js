// USE THESE IMPORT STATEMENTS FOR RUNNING JS AS MODULE USING NODE JS

// import dotenv from "dotenv";
// import { get } from "node:http";
// import { CLIENT_RENEG_LIMIT } from "node:tls";
// dotenv.config();

// const { CLIENT_RENEG_LIMIT } = require("node:tls")

async function getOpenWeatherData(city) {
    let req = await fetch(`api/weather?city=${city}`)
    let data = await req.json()
    return data
}

// USE THIS METHOD IF USING GOOGLE WEATHER API

// async function getGoogleWeatherData(lat, long) {
//     let req = await fetch(`https://weather.googleapis.com/v1/currentConditions:lookup?key=${process.env.GOOGLE_API_KEY}&location.latitude=${lat}&location.longitude=${long}`)
//     let data = await req.json()
//     return data
// }

// getOpenWeatherData("karachi").then(res => {
//     getGoogleWeatherData(res.coord.lat, res.coord.lon).then(res => console.log(res))
// })

document.querySelector("#getWeather").addEventListener("click", () => {
    let city = document.getElementById("cityInput").value.trim();
    let resultBox = document.querySelector("#Results")

    if (city) {
        city = city.replaceAll(" ", "")
        let fetchedData = getOpenWeatherData(city)
        city = ""
        fetchedData.then(res => {
            if (res.cod == "404") {
                return resultBox.innerHTML = `<h4>Error ❌</h4>
                <h5>${res.message}</h5>`
            }
            return resultBox.innerHTML = `<h4>Location: <span class="spans">${res.name}, ${res.sys.country}</span></h4>
            <h4>Description: <span class="spans">${res.weather[0].description}</span></h4>
            <h4>Temperature: <span class="spans">${(res.main.temp - 273.15).toFixed(2)}°C</span></h4>
            <h4>Feels Like: <span class="spans">${(res.main.feels_like - 273.15).toFixed(2)}°C</span></h4>
            <h4>Humidity: <span class="spans">${res.main.humidity}%</span></h4>
            <h4>Pressure: <span class="spans">${res.main.pressure} hPa</span></h4>
            <h4>Visibility: <span class="spans">${(res.visibility/1000).toFixed(1)} km</span></h4>
            <h4>Wind: <span class="spans">${res.wind.speed} meter/sec</span></h4>
            <h4>Cloudiness: <span class="spans">${res.clouds.all}%</span></h4>`
        })
    } else {
        resultBox.innerHTML = `<h5>Error</h5>
        <p>Please specify city/country name correctly</p>`
    }
})