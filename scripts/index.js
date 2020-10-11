window.onload = addListeners();

function addListeners() {
  addTableListener();
  addClickListener()
}

function addTableListener() {
  let grid = document.querySelector(".grid")
  grid.addEventListener("mouseenter", e => {
    addWheelListener(e.target);
  })
}

function addWheelListener(target) {
  target.onwheel = e => {
    e.preventDefault();
    let range = parseFloat(target.getAttribute("data-range"));
    //let targetRange = parseFloat(range.toFixed(1))
    if (e.deltaY < 0) {
      incrementRange(target, range)
    } else if (e.deltaY > 0) {
      decrementRange(target, range)
    }
  }
}

function addClickListener(e) {
  let tds = document.querySelectorAll("td")
  for (let td of tds) {
    td.addEventListener("click", (e) => {
      for (let td of tds) {
        td.classList.remove("lowlight")
      }
      td.classList.add("lowlight")
      document.querySelector("#hand-value").innerText = td.innerText
    })
  }
}

function incrementRange(target, range) {
  if (range < 100) {
    range += 0.1
    let targetId = target.getAttribute("id");
    document.querySelector(`#${targetId}`).setAttribute("data-range", range);
    updateSliderRange(range);
    deconstructJSON(target, range);
  }
}

function decrementRange(target, range) {
  if (range > 0) {
    range -= 0.1
    let targetId = target.getAttribute("id")
    document.querySelector(`#${targetId}`).setAttribute("data-range", range)
    updateSliderRange(range)
    deconstructJSON(target, range)
  }
}

function updateSliderRange(range) {
  //necessary because of large trailing decimal
  document.querySelector("#range-value").innerText = range.toFixed(1);
}

function deconstructJSON(target, range) {
  let toggle = document.getElementById("mySwitch");
  if (toggle.checked === true) {
    fetchJammingJSON(target, range)
  } else {
    fetchCallingJSON(target, range)
  }
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

function fetchJammingJSON(target, range) {
  fetch("../formatted_jamming.json")
    .then(response => response.json())
    .then(json => {
      let blochJamming = json.bloch_jam;
      calcRange(blochJamming, target, range)
    })
}

function fetchCallingJSON(target, range) {
  fetch("../formatted_calling.json")
    .then(response => response.json())
    .then(json => {
      let blochCalling = json.bloch_call;
      calcRange(blochCalling, target, range)
    })
}

function calcRange(rangeData, target, range) {
  let json = rangeData;
  let callingCombos = 0;
  let index;
  let handStringValues = [];
  let filteredHandObjects;
  json.some(function (a, i) {
    index = i;
    if (convertToPercent((callingCombos + a.combos)) > range) {
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


