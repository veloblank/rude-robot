import * as ranges from "./ranges.js";

window.onload = addTableListeners();

function addTableListeners() {
  let tables = document.querySelectorAll(".grid");
  for (let table of tables) {
    table.addEventListener("mouseover", (e) => {
      console.log(e.relatedTarget)
      findRange(e);
    });
  }
}

function findRange(e) {
  let gridTarget = e.target;
  let gridValue = parseInt(gridTarget.getAttribute("data-range"));
  document.getElementById("range-value").innerText = gridValue
  gridTarget.onwheel = (e) => {
    handleScroll(e, gridValue, gridTarget)
  };
}

function handleScroll(e, gridValue, gridTarget) {
  e.preventDefault();
  if (e.deltaY < 0 && gridValue < 100) {
    gridValue += 1
    console.log("We're scrolling up!")
    document.getElementById("range-value").innerText = gridValue
    gridTarget.setAttribute("data-range", gridValue)
  } else if (e.deltaY > 0 && gridValue > 0) {
    gridValue -= 1
    console.log("We're scrolling down!")
    document.getElementById("range-value").innerText = gridValue
    gridTarget.setAttribute("data-range", gridValue)
  } else {
    console.log("Nothing!")
  }
}