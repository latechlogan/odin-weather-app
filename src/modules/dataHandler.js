import eventBus from "./eventBus";

// dataHandler.js
const dataHandler = (function () {
  let weatherData = {};

  const fetchData = async function (location = "71291", unitGroup = "us") {
    let apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&include=current&key=YPDL4TZQQEGCWFX57LUSCQDWT&contentType=json`;

    try {
      const response = await fetch(apiUrl, { method: "GET", headers: {} });
      const weather = await response.json();
      return weather;
    } catch (error) {
      console.error(error);
    }
  };

  const setWeatherData = function (object = "") {
    const dataUs = fetchData(object.location, "us");
    const dataMetric = fetchData(object.location, "metric");

    Promise.all([dataUs, dataMetric]).then(([dataUs, dataMetric]) => {
      weatherData = {
        currentUs: dataUs.currentConditions,
        currentMetric: dataMetric.currentConditions,
        forecastUs: dataUs.days.slice(0, 5),
        forecastMetric: dataMetric.days.slice(0, 5),
      };
      eventBus.emit("weatherDataChanged", getWeatherData());
    });
  };

  const getWeatherData = function () {
    return weatherData;
  };

  eventBus.on("locationChanged", setWeatherData);

  return { setWeatherData, getWeatherData };
})();

export default dataHandler;
