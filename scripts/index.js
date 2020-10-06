import { BLOCH_CALL } from "./blochCallArray.js"
import RangeCounter from "./RangeCounter.js"

window.onload = addTableListener();

function addTableListener() {
  let grids = document.querySelectorAll(".grid");
  for (let grid of grids) {
    grid.addEventListener("mouseenter", e => {
      let target = e.target;
      updateSliderOnMouseEnter(target)
      addWheelListener(target);
    })
  }
}

function addWheelListener(target) {
  target.onwheel = (e) => {
    e.preventDefault();
    let targetRange = parseInt(target.getAttribute("data-range"));
    if (e.deltaY < 0) {
      incrementRange(target, targetRange)
    } else if (e.deltaY > 0) {
      decrementRange(target, targetRange)
    }
  }
}

function incrementRange(target, range) {
  if (range < 100) {
    let newRange = range + 1
    let targetId = target.getAttribute("id")
    document.querySelector(`#${targetId}`).setAttribute("data-range", newRange)
    updateSliderRange(newRange)
    deconstructJSON(target, newRange)
  }
}

function decrementRange(target, range) {
  if (range > 1) {

    let newRange = range - 1
    let targetId = target.getAttribute("id")
    document.querySelector(`#${targetId}`).setAttribute("data-range", newRange)
    updateSliderRange(newRange)
    deconstructJSON(target, newRange)
  }
}

function updateSliderRange(range) {
  document.querySelector("#range-value").innerText = range;
}

function updateSliderOnMouseEnter(target) {
  document.querySelector("#range-value").innerText = parseInt(target.getAttribute("data-range"));
}

function colorizeRange(target, blochCalling, range) {
  let targetGrid = target;
  let callingJSON = blochCalling;
  let currentRange = range;



}

function deconstructJSON(target, range) {
  fetch("../formatted_calling.json")
    .then(response => response.json())
    .then(json => {
      let blochCalling = json.bloch_call;
      let blochJamming = json.bloch_jam;
      //colorizeRange(target, blochCalling, range)
      parseCallingJSON(blochCalling, target, range)
    })
}

function parseCallingJSON(callingData, target, range) {
  let json = callingData;

  console.log(json[range])
}