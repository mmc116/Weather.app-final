function showCityTemperature(response) {
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

  axios.get(apiUrl).then(showCityTemperature);
}

let searchCity = document.querySelector("#search-button");
searchCity.addEventListener("click", getCityTemperature);
navigator.geolocation.getCurrentPosition(getLocationWeather);
