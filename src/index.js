import "./style.css";
import "@fontsource-variable/figtree";
import inputHandler from "./modules/inputHandler.js";
import dataHandler from "./modules/dataHandler.js";
import uiHandler from "./modules/uiHandler.js";
import eventBus from "./modules/eventBus.js";

window.inputHandler = inputHandler;
window.dataHandler = dataHandler;
window.uiHandler = uiHandler;

const initApp = (function () {
  eventBus.emit("appStart");
})();
