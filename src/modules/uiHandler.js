import eventBus from "./eventBus";
import feather from "feather-icons";

const uiHandler = (function () {
  const tempOutput = document.querySelector("#temp-output");

  const displayWeather = function (weatherData) {
    tempOutput.textContent = weatherData.currentUs.temp;
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
