let currentDate = new Date();
let currentTime = currentDate.getHours();
if (currentTime < 10) {
  currentTime = `0${currentTime}`;
}
let currentMinutes = currentDate.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let displayDate = document.querySelector("h4");
// Log the current day
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = day[currentDate.getDay()];

displayDate.innerHTML = `${currentDay} ${currentTime}:${currentMinutes}`;

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", showCity);

function showCity(event) {
  event.preventDefault();

  let apiKey = "4e8a325874b73356d5a566981f399eb3";
  let units = "metric";
  let typedCity = document.querySelector("#text-input");
  let city = document.querySelector("h2");
  city.innerHTML = typedCity.value;
  let cityName = typedCity.value;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);
  let city = document.querySelector("h2");
  city.innerHTML = response.data.name;
  let Temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Temperature;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#TempDescription");
  descriptionElement.innerHTML = `${description}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4e8a325874b73356d5a566981f399eb3";
  let units = "metric";
  let apiEndpoint = "https:/api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon={longitude}
  &appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);

  let h1 = document.querySelector("h1");
  h1.innerHTML = `Your latitude is ${latitude} and your longitude is ${longitude}`;
}

function getCurrentPosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
