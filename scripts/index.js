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
    if (e.deltaY > 0) {
      incrementRange(target, targetRange)
    } else if (e.deltaY < 0) {
      decrementRange(target, targetRange)
    }
  }
}

function incrementRange(target, range) {
  let newRange = range + 1
  let targetId = target.getAttribute("id")
  document.querySelector(`#${targetId}`).setAttribute("data-range", newRange)
  updateSliderRange(newRange)
}

function decrementRange(target, range) {
  let newRange = range - 1
  let targetId = target.getAttribute("id")
  document.querySelector(`#${targetId}`).setAttribute("data-range", newRange)
  updateSliderRange(newRange)
}

function updateSliderRange(range) {
  document.querySelector("#range-value").innerText = range;
}

function updateSliderOnMouseEnter(target) {
  document.querySelector("#range-value").innerText = parseInt(target.getAttribute("data-range"));
}