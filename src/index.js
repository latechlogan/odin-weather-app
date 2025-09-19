import "./style.css";
import inputHandler from "./modules/inputHandler.js";
import dataHandler from "./modules/dataHandler.js";
import uiHandler from "./modules/uiHandler.js";
import eventBus from "./modules/eventBus.js";

window.inputHandler = inputHandler;
window.dataHandler = dataHandler;

const initApp = (function () {
  eventBus.emit("appStart");
})();
