import eventBus from "./eventBus";
import feather from "feather-icons";
import inputHandler from "./inputHandler";
import dataHandler from "./dataHandler";

const uiHandler = (function () {
  const locationInput = document.querySelector("#zip");
  const tempOutput = document.querySelector("#temp-output");
  const iconMap = {
    snow: "snow.svg",
    "snow-showers-day": "snow.svg",
    "snow-showers-night": "snow.svg",
    "thunder-rain": "thunderstorms.svg",
    "thunder-showers-day": "thunderstorms-day.svg",
    "thunder-showers-night": "thunderstorms-night.svg",
    rain: "rain.svg",
    "showers-day": "rain.svg",
    "showers-night": "rain.svg",
    fog: "fog.svg",
    wind: "wind.svg",
    cloudy: "cloudy.svg",
    "partly-cloudy-day": "cloudy-day.svg",
    "partly-cloudy-night": "cloudy-night.svg",
    "clear-day": "clear-day.svg",
    "clear-night": "clear-night.svg",
  };

  const handleLocationInput = function () {
    const location = locationInput.value;
    eventBus.emit("locationCaptured", location);
  };

  const displayWeather = function () {
    const userSettings = inputHandler.getUserSettings();
    tempOutput.textContent = `${
      userSettings.units === "us"
        ? dataHandler.getWeatherData().currentUs.temp
        : dataHandler.getWeatherData().currentMetric.temp
    }${userSettings.units === "us" ? "\u00B0F" : "\u00B0C"}`;
  };

  const displayWeatherIcon = function () {
    const iconValue = dataHandler.getWeatherData().currentUs.icon;
    const iconFile = iconMap[iconValue];

    console.log(iconValue, iconFile);

    const img = document.createElement("img");
    img.setAttribute("src", `./src/assest/weather-icons/${iconFile}`);
    img.setAttribute("width", "512");
    img.setAttribute("height", "512");
    document.querySelector("#icon-output").prepend(img);
  };

  const createSubmitIcon = function () {
    const locationSubmit = document.createElement("button");
    locationSubmit.dataset.feather = "search";
    document.querySelector(".input-bar").appendChild(locationSubmit);
    feather.replace();

    locationSubmit.addEventListener("click", handleLocationInput);
  };

  locationInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleLocationInput();
    }
  });

  eventBus.on("appStart", createSubmitIcon);
  eventBus.on("weatherDataChanged", displayWeather);
  eventBus.on("unitsChanged", displayWeather);

  return { displayWeatherIcon };
})();

export default uiHandler;
