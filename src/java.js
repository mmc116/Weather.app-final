function showTime() {
  let now = new Date();
  let hourDate = document.querySelector("#hour-date");
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let weekDay = weekDays[now.getDay()];
  let monthDay = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  hourDate.innerHTML = `${hour}:${minutes} ${weekDay} <br />${monthDay}.${month}.${year}`;
}

showTime();

function showLocationWeather(response) {
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  let temp = document.querySelector("#temperature");
  let wind = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let real = document.querySelector("#real-feel");
  h1.innerHTML = `${cityName}`;
  temp.innerHTML = `${temperature}°`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  real.innerHTML = `Real Feel: ${Math.round(response.data.main.feels_like)}°c`;
}
function getLocationWeather(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "ff3fb90c5258ccf0229e6dfb9eb39e40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showLocationWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(getLocationWeather);
}

getPosition();

function searchedCityTemperature(response) {
  let city = document.querySelector("#city");
  let temp = document.querySelector("#temperature");
  let wind = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let real = document.querySelector("#real-feel");
  city.innerHTML = `${response.data.name}`;
  temp.innerHTML = `${Math.round(response.data.main.temp)}°`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  real.innerHTML = `Real Feel: ${Math.round(response.data.main.feels_like)}°c`;
}

function getCityTemperature(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let unit = "metric";
  let apiKey = "ff3fb90c5258ccf0229e6dfb9eb39e40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(searchedCityTemperature);
}

let searchCity = document.querySelector("#search-button");
searchCity.addEventListener("click", getCityTemperature);
navigator.geolocation.getCurrentPosition(getLocationWeather);
