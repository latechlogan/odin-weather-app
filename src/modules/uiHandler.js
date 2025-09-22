import eventBus from "./eventBus";
import feather from "feather-icons";
import inputHandler from "./inputHandler";
import dataHandler from "./dataHandler";

const uiHandler = (function () {
  const locationInput = document.querySelector("#zip");
  const unitsToggle = document.querySelector("#units-pref");
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
    const tempOutput = document.querySelector(".temp-output");
    const briefOutput = document.querySelector(".brief-output");
    const feelsOutput = document.querySelector(".feels-output");

    tempOutput.textContent = `${
      userSettings.units === "us"
        ? Math.round(dataHandler.getWeatherData().currentUs.temp)
        : Math.round(dataHandler.getWeatherData().currentMetric.temp)
    }${userSettings.units === "us" ? "\u00B0F" : "\u00B0C"}`;

    briefOutput.textContent = `${
      dataHandler.getWeatherData().currentUs.conditions
    }`;

    feelsOutput.textContent = `Humidity: ${
      userSettings.units === "us"
        ? Math.round(dataHandler.getWeatherData().currentUs.humidity)
        : Math.round(dataHandler.getWeatherData().currentMetric.humidity)
    }% | Feels like: ${
      userSettings.units === "us"
        ? Math.round(dataHandler.getWeatherData().currentUs.feelslike)
        : Math.round(dataHandler.getWeatherData().currentMetric.feelslike)
    }${userSettings.units === "us" ? "\u00B0F" : "\u00B0C"}`;

    displayWeatherIcon();
    displayForecast();
  };

  const displayWeatherIcon = function () {
    const iconOutput = document.querySelector(".icon-output");

    const iconValue = dataHandler.getWeatherData().currentUs.icon;
    const iconFile = iconMap[iconValue];

    if (iconOutput.innerHTML === iconSVG[iconFile]) {
      return;
    } else {
      iconOutput.innerHTML = iconSVG[iconFile];
    }
  };

  const displayForecast = function () {
    const userSettings = inputHandler.getUserSettings();
    document.querySelector(".forecast-heading").classList.remove("sr-only");
    const forecastOutput = document.querySelector(".forecast-output");
    forecastOutput.innerHTML = "";

    for (let i = 0; i < 5; i++) {
      const day = document.createElement("div");

      const date = new Date(
        dataHandler.getWeatherData().forecastUs[i].datetimeEpoch * 1000
      );
      const dateFormat = document.createElement("p");
      dateFormat.setAttribute("style", "margin-bottom: 0.5rem;");
      dateFormat.className = "small-print";
      dateFormat.innerHTML = date.toLocaleDateString("en-US", {
        // weekday: "short",
        day: "numeric",
        month: "short",
      });
      const tempMax = document.createElement("p");
      tempMax.className = "h5";
      tempMax.textContent = `${
        userSettings.units === "us"
          ? Math.round(dataHandler.getWeatherData().forecastUs[i].tempmax)
          : Math.round(dataHandler.getWeatherData().forecastMetric[i].tempmax)
      }${userSettings.units === "us" ? "\u00B0F" : "\u00B0C"}`;
      const tempMin = document.createElement("p");
      tempMin.className = "small-print";
      tempMin.textContent = `${
        userSettings.units === "us"
          ? Math.round(dataHandler.getWeatherData().forecastUs[i].tempmin)
          : Math.round(dataHandler.getWeatherData().forecastMetric[i].tempmin)
      }${userSettings.units === "us" ? "\u00B0F" : "\u00B0C"}`;
      // const conditions = document.createElement("p");
      // conditions.className = "small-print";
      // conditions.textContent =
      //   dataHandler.getWeatherData().forecastUs[i].conditions;

      day.append(dateFormat, tempMax, tempMin);

      forecastOutput.append(day);
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
    if (e.key === "Enter" && e.target.value !== "") {
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
