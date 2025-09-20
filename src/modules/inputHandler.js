import eventBus from "./eventBus";

const inputHandler = (function () {
  let userSettings = {
    location: undefined,
    units: "us",
  };

  const setLocation = function (consoleInput) {
    userSettings.location = consoleInput;
    eventBus.emit("userSettingsChanged", getUserSettings());
  };

  const setUnits = function (consoleInput) {
    userSettings.units = consoleInput;
    eventBus.emit("userSettingsChanged", getUserSettings());
  };

  const getUserSettings = function () {
    return userSettings;
  };

  return { setLocation, setUnits, getUserSettings };
})();

export default inputHandler;
