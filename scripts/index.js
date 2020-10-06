import { BLOCH_CALL } from "./blochCallArray.js"
import RangeCounter from "./RangeCounter.js"
window.onload = addTableListener();

function addTableListener() {
  let grids = document.querySelectorAll(".grid");
  for (let grid of grids) {
    grid.addEventListener("mouseenter", e => {
      let target = e.target;
      addWheelListener(target);
    })
  }
}

function addWheelListener(target) {
  target.onwheel = (e) => {
    e.preventDefault();
    let targetRange = target.getAttribute("data-range");
    if (e.deltaY > 0) {
      console.log("Scrolling up!")
    } else if (e.deltaY < 0) {
      console.log("Scrolling down!")
    }
  }
}