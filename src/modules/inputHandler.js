import eventBus from "./eventBus";

const inputHandler = (function () {
  let userSettings = {
    location: undefined,
    units: "us",
  };

  const setLocation = function (userInput) {
    userSettings.location = userInput;
    eventBus.emit("locationChanged", getUserSettings());
  };

  const setUnits = function (userInput) {
    userSettings.units = userInput;
    eventBus.emit("unitsChanged", getUserSettings());
  };

  const getUserSettings = function () {
    return userSettings;
  };

  eventBus.on("locationCaptured", setLocation);

  return { setLocation, setUnits, getUserSettings };
})();

export default inputHandler;
