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
    let targetRange = parseFloat(target.getAttribute("data-range"));
    if (e.deltaY < 0) {
      incrementRange(target, targetRange)
    } else if (e.deltaY > 0) {
      decrementRange(target, targetRange)
    }
  }
}

function incrementRange(target, range) {
  if (range < 100) {
    let newRange = range + 0.5
    let targetId = target.getAttribute("id")
    document.querySelector(`#${targetId}`).setAttribute("data-range", newRange)
    updateSliderRange(newRange)
    deconstructJSON(target, newRange)
  }
}

function decrementRange(target, range) {
  if (range > 0) {
    let newRange = range - 0.5
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

function colorizeRange(target, filteredStringArr, filteredObjArr) {
  let table = document.getElementById(target.getAttribute("id"));
  let tableId = table.getAttribute("id");
  let tds = document.querySelectorAll(`#${tableId} td`);
  let bottomRange = filteredStringArr.slice(-4);
  let callingRange = filteredStringArr;
  //let callingRange = filteredStringArr.filter(x => bottomRange.includes(x));
  for (let td of tds) {
    if (callingRange.includes(`${td.getAttribute("id")}`)) {
      document.querySelector(`#${td.getAttribute("id")}`).classList.add("highlight")
    } else {
      document.querySelector(`#${td.getAttribute("id")}`).classList.remove("highlight")
    }
  }
}

function deconstructJSON(target, range) {
  fetch("../formatted_calling.json")
    .then(response => response.json())
    .then(json => {
      let blochCalling = json.bloch_call;
      let blochJamming = json.bloch_jam;
      calcCallingRange(blochCalling, target, range)
    })
}

function calcCallingRange(callingData, target, range) {
  let json = callingData;
  let restriction = range;
  let callingCombos = 0;
  let index;
  let handStringValues = [];
  let filteredHandObjects;
  json.some(function (a, i) {
    index = i;
    if (convertToPercent((callingCombos + a.combos)) > restriction) {
      return true
    }
    callingCombos += a.combos;
    handStringValues.push(a.code)
  });
  filteredHandObjects = json.splice(0, index)
  colorizeRange(target, handStringValues, filteredHandObjects)
}

function convertToPercent(combos) {
  return (combos / 1326) * 100
}


