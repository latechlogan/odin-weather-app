import eventBus from "./eventBus";
import feather from "feather-icons";
import inputHandler from "./inputHandler";

const uiHandler = (function () {
  const locationInput = document.querySelector("#zip");
  let locationSubmit = undefined;
  const tempOutput = document.querySelector("#temp-output");

  const handleLocationInput = function () {
    const userInput = locationInput.value;
    eventBus.emit("inputCaptured", userInput);
  };

  const displayWeather = function (weatherData) {
    const userSettings = inputHandler.getUserSettings();
    console.log(userSettings, "weatherData: ", weatherData);
    tempOutput.textContent = `${
      userSettings.units === "us"
        ? weatherData.currentUs.temp
        : weatherData.currentMetric.temp
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
