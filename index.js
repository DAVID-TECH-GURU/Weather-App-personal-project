const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infotxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  wIcon = document.querySelector("weather-part img"),
  arrowBack = wrapper.querySelector("header i");

inputField.addEventListener("keyup", e => {
  if (e.key === "Enter" && inputField.value !== "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser does not support geolocation api");
  }
});

async function requestApi(city) {
  const apiKey = "a0b820d0c40f53041b27e3c5229425d7";
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  await fetchData(api);
}

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    const apiKey = "a0b820d0c40f53041b27e3c5229425d7";
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetchData(api);
  }
  

function onError(error) {
  infotxt.innerText = error.message;
  infotxt.classList.add("error");
}

async function fetchData(api) {
  infotxt.innerText = "Getting weather details...";
  infotxt.classList.add("pending");
  try{
    const response = await fetch(api);
    const result = await response.json();
    weatherDetails(result);
  } catch (error) {
    console.error(error);
  }
}

function weatherDetails(weatherData) {
  const city = document.querySelector("#weather-part .location span");
  const description = document.querySelector("#weather-part .weather");
  const temperature = document.querySelector("#weather-part .temp .numb");
  const weatherIcon = document.querySelector("#weather-part img");

  if (city !== null) {
    city.innerText = weatherData.name;
  }

  if (description !== null) {
    description.innerText = weatherData.weather[0].description;
  }

  if (temperature !== null) {
    temperature.innerText = `${Math.round(weatherData.main.temp)}°C`;
  }

  if (weatherIcon !== null) {
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  }

  infotxt.classList.remove("pending", "error");
  wrapper.classList.add("active");

  console.log(weatherData);
}

