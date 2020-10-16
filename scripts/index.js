window.onload = addListeners();

let rangeVar = 0;
let eqVar = 0;
let stackVar = 0;
let handVar = 0;

function addListeners() {
  addTableListener();
  addClickListener()
}

function addTableListener() {
  let grid = document.querySelector(".grid")
  grid.addEventListener("mouseenter", e => {
    addWheelListener(e.target);
  })
  // grid.addEventListener("mouseleave", (e) => {
  //   let table = document.getElementById(e.target.getAttribute("id"));
  //   let tableId = table.getAttribute("id");
  //   let tds = document.querySelectorAll(`#${tableId} td`);
  //   for (let td of tds) {
  //     document.querySelector(`#${td.getAttribute("id")}`).classList.remove("highlight")
  //   }
  // })
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
      let points = td.getAttribute("data-bvb")
      //document.querySelector("#hand-value").innerText = points
      handVar = parseFloat(points)
      updatePoints();
    })
  }
}

function incrementRange(target, range) {
  let targetId = target.getAttribute("id");
  if (range < 100) {
    range += 0.2
    document.querySelector(`#${targetId}`).setAttribute("data-range", range);
    //document.querySelector("#call-range").innerText = convertRangeToPoints(range);
    convertRangeToPoints(range);
    updateSliderRange(range);
    checkToggle(target, range);
  }
}

function decrementRange(target, range) {
  let targetId = target.getAttribute("id")
  if (range > 0) {
    range -= 0.2
    document.querySelector(`#${targetId}`).setAttribute("data-range", range)
    //document.querySelector("#call-range").innerText = convertRangeToPoints(range);
    convertRangeToPoints(range);
    updateSliderRange(range)
    checkToggle(target, range)
  }
}

function convertRangeToPoints(range) {
  let fixedRange = parseFloat(range.toFixed(1))
  let points;
  if (fixedRange < 7) {
    points = "13"
    rangeVar = 13;
  } else if (fixedRange < 9) {
    points = "12"
    rangeVar = 12;
  } else if (fixedRange < 12) {
    points = "11"
    rangeVar = 11;
  } else if (fixedRange < 14) {
    points = "10"
    rangeVar = 10;
  } else if (fixedRange < 17) {
    points = "9"
    rangeVar = 9;
  } else if (fixedRange < 20) {
    points = "8"
    rangeVar = 8;
  } else if (fixedRange < 22) {
    points = "7"
    rangeVar = 7;
  } else if (fixedRange < 25) {
    points = "6"
    rangeVar = 6;
  } else if (fixedRange < 27) {
    points = "5"
    rangeVar = 5;
  } else if (fixedRange < 30) {
    points = "4"
    rangeVar = 4;
  } else if (fixedRange < 35) {
    points = "3"
    rangeVar = 3;
  } else if (fixedRange < 40) {
    points = "2"
    rangeVar = 2;
  } else if (fixedRange < 50) {
    points = "1"
    rangeVar = 1;
    rangeVar = 0;
    rangeVar = -1;
    rangeVar = -2;
  } else if (fixedRange < 60) {
    points = "0"
  } else if (fixedRange < 70) {
    points = "-1"
  } else if (fixedRange < 80) {
    points = "-2"
  } else {
    points = "-3"
    rangeVar = -3;
  }
  return points

}


function updateSliderRange(range) {
  //necessary because of large trailing decimal
  document.querySelector("#range-value").innerText = range.toFixed(1);
}

function checkToggle(target, range) {
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
  updatePoints();
}

function updatePoints() {
  document.querySelector("#var-totals").innerText = `${rangeVar + handVar + eqVar + stackVar}`
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


