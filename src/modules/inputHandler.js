import eventBus from "./eventBus";

const inputHandler = (function () {
  let userSettings = {
    location: "",
    units: "",
  };

  const setLocation = function (consoleInput) {
    userSettings.location = consoleInput;
    eventBus.emit("userSettingsChanged", getUserSettings);
  };

  const setUnits = function (consoleInput) {
    userSettings.units = consoleInput;
    eventBus.emit("userSettingsChanged", getUserSettings);
  };

  const getUserSettings = function () {
    return userSettings;
  };
})();

export default inputHandler;
