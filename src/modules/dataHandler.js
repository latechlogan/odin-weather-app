// dataHandler.js
const dataHandler = (function () {
  let data = {};

  const fetchData = async function (location = "71291", unitGroup = "us") {
    let apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&include=current&key=YPDL4TZQQEGCWFX57LUSCQDWT&contentType=json`;

    try {
      const response = await fetch(apiUrl, { method: "GET", headers: {} });
      data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const getData = function () {
    return data;
  };

  return { fetchData, getData };
})();

export default dataHandler;
