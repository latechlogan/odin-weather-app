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

  const setWeatherData = function (location) {
    weatherData = {
      dataUs: fetchData(location, "us"),
      dataMetric: fetchData(location, "metric"),
    };
  };

  const getWeatherData = function () {
    return weatherData;
  };

  return { setWeatherData, getWeatherData };
})();

export default dataHandler;
