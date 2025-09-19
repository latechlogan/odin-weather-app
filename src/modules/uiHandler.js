import eventBus from "./eventBus";

const uiHandler = (function () {
  const tempOutput = document.querySelector("#temp-output");

  const displayWeather = function (weatherData) {
    tempOutput.textContent = weatherData.currentUs.temp;
  };

  eventBus.on("weatherDataChanged", displayWeather);
})();

export default uiHandler;
