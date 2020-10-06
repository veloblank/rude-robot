import { BLOCH_CALL } from "./blochCallArray.js"
window.onload = addTableListeners();

function addTableListeners() {
  let tables = document.querySelectorAll(".grid");
  for (let table of tables) {
    table.addEventListener("mouseenter", (e) => {
      findEmptyTableTds(e);
    });
  }
}

function findEmptyTableTds(e) {
  let gridTarget = e.target;
  let tableId = e.target.getAttribute("id");
  let gridValue = parseInt(gridTarget.getAttribute("data-range"));
  let rangeArray = BLOCH_CALL.splice(0, gridValue)
  gridTarget.onwheel = (e) => {
    handleScroll(e, rangeArray, tableId, gridValue, gridTarget)
  };
}

function handleScroll(e, rangeArray, tableId, gridValue, gridTarget) {
  e.preventDefault();
  if (e.deltaY < 0 && gridValue < 100) {
    gridValue += 1
    gridTarget.setAttribute("data-range", gridValue)
    addClassesToTds(e, rangeArray, tableId)
  } else if (e.deltaY > 0 && gridValue > 0) {
    gridValue -= 1
    gridTarget.setAttribute("data-range", gridValue)
    addClassesToTds(e, rangeArray, tableId)
  } else {
    console.log("Nothing!")
  }
}

function addClassesToTds(e, rangeArray, table) {
  let tds = document.querySelectorAll(`#${table} td`);
  for (let td of tds) {
    if (rangeArray.includes(`${td.getAttribute("id")}`)) {
      document.querySelector(`#${td.getAttribute("id")}`).classList.add("highlight")
    }
  }
}

