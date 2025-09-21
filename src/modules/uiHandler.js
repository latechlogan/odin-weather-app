import eventBus from "./eventBus";
import feather from "feather-icons";
import inputHandler from "./inputHandler";
import dataHandler from "./dataHandler";

const uiHandler = (function () {
  const locationInput = document.querySelector("#zip");
  const unitsToggle = document.querySelector("#units-pref");
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

  function importAll(r) {
    let iconSVG = {};
    r.keys().map((item, index) => {
      iconSVG[item.replace("./", "")] = r(item);
    });
    return iconSVG;
  }

  const iconSVG = importAll(
    require.context("../assets/weather-icons/", false, /\.svg$/)
  );

  const handleLocationInput = function () {
    const location = locationInput.value;
    eventBus.emit("locationCaptured", location);
  };

  const handleUnitToggle = function () {
    if (this.checked) {
      inputHandler.setUnits("metric");
    } else {
      inputHandler.setUnits("us");
    }
  };

  const displayWeather = function () {
    const userSettings = inputHandler.getUserSettings();
    tempOutput.textContent = `${
      userSettings.units === "us"
        ? Math.round(dataHandler.getWeatherData().currentUs.temp)
        : Math.round(dataHandler.getWeatherData().currentMetric.temp)
    }${userSettings.units === "us" ? "\u00B0F" : "\u00B0C"}`;

    displayWeatherIcon();
  };

  const displayWeatherIcon = function () {
    const iconOutput = document.querySelector("#icon-output");

    const iconValue = dataHandler.getWeatherData().currentUs.icon;
    const iconFile = iconMap[iconValue];

    if (iconOutput.innerHTML === iconSVG[iconFile]) {
      return;
    } else {
      iconOutput.innerHTML = iconSVG[iconFile];
    }
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

  unitsToggle.addEventListener("change", handleUnitToggle);

  eventBus.on("appStart", createSubmitIcon);
  eventBus.on("weatherDataChanged", displayWeather);
  eventBus.on("unitsChanged", displayWeather);

  return { displayWeatherIcon };
})();

export default uiHandler;
