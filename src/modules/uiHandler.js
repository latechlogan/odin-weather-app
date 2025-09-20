import eventBus from "./eventBus";
import feather from "feather-icons";
import inputHandler from "./inputHandler";
import dataHandler from "./dataHandler";

const uiHandler = (function () {
  const locationInput = document.querySelector("#zip");
  let locationSubmit = undefined;
  const tempOutput = document.querySelector("#temp-output");

  const handleLocationInput = function () {
    const location = locationInput.value;
    eventBus.emit("locationChanged", location);
  };

  const displayWeather = function () {
    const userSettings = inputHandler.getUserSettings();
    tempOutput.textContent = `${
      userSettings.units === "us"
        ? dataHandler.getWeatherData().currentUs.temp
        : dataHandler.getWeatherData().currentMetric.temp
    }${userSettings.units === "us" ? "\u00B0F" : "\u00B0C"}`;
  };

  const createSubmitIcon = function () {
    locationSubmit = document.createElement("button");
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
})();

export default uiHandler;
