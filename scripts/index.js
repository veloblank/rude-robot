import { BLOCH_CALL } from "./blochCallArray.js";
import { BLOCH_PUSH } from "./blochPushArray.js";
import nashCall from "./callStringArr.js";
import nashJam from "./jamStringArr.js";


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
    if (e.deltaY < 0) {
      incrementRange(target, range)
    } else if (e.deltaY > 0) {
      decrementRange(target, range)
    }
  }
}

function addClickListener(e) {
  let button = document.querySelector("#mySwitch")
  button.addEventListener("input", () => {
    if (checkToggle()) {
      document.querySelector(".push-hands").classList.remove("hidden")
      document.querySelector(".call-hands").classList.add("hidden")
    } else {
      document.querySelector(".push-hands").classList.add("hidden")
      document.querySelector(".call-hands").classList.remove("hidden")

    }
  })
  let tds = document.querySelectorAll("td")
  for (let td of tds) {
    td.addEventListener("click", (e) => {
      for (let td of tds) {
        td.classList.remove("click-highlight")
      }
      td.classList.add("click-highlight")
      fetchRangeFromClick(e.target)
    })
  }
}

function fetchRangeFromClick(clickedHand) {
  let bool = checkToggle();
  bool ? fetchJammingRange(clickedHand) : fetchCallingRange(clickedHand);
}


function fetchJammingRange(hand) {
  fetch("../formatted_jamming.json")
    .then(resp => resp.json())
    .then(json => {
      let shortJsonRange = convertClickToArr(hand, json);
    })
  let handCheck = (el) => el === hand.getAttribute("id")
  let index = BLOCH_PUSH.findIndex(handCheck)
  let range = BLOCH_PUSH.slice(0, index + 1)
  colorizeFromClick(range, hand, shortJsonRange);
}

function fetchCallingRange(hand) {
  let arrRange = convertClickToArr(hand, nashCall);
  let handCheck = (el) => el === hand.getAttribute("id")
  let index = BLOCH_CALL.findIndex(handCheck)
  let range = BLOCH_CALL.slice(0, index + 1)
  colorizeFromClick(range, hand, arrRange);
}

function convertClickToArr(hand, arr) {
  let clickedHand = hand.getAttribute("id");
  let handCheck = (el) => el === clickedHand
  let index = arr.findIndex(handCheck)
  let range = arr.slice((index - 5), (index + 6))
  return range
}

function colorizeFromClick(range, hand, arrRange) {
  let tds = document.querySelectorAll("td");
  let fullRange = "";
  for (let td of tds) {
    if (range.includes(`${td.getAttribute("id")}`)) {
      document.querySelector(`#${td.getAttribute("id")}`).classList.add("click-highlight")
      document.querySelector(`#${td.getAttribute("id")}`).classList.remove("highlight")
    } else {
      document.querySelector(`#${td.getAttribute("id")}`).classList.remove("click-highlight")
      document.querySelector(`#${td.getAttribute("id")}`).classList.remove("highlight")
    }
  }
  let i = 0;
  for (let r of arrRange) {
    if (i == 5) {
      fullRange += `<span class="disp-hand selected">${r}</span>`
    } else {
      fullRange += `<span class="disp-hand">${r}</span>`
    }
    i++
  }
  document.getElementById("range").innerHTML = fullRange;
}

function incrementRange(target, range) {
  let targetId = target.getAttribute("id");
  if (range < 100) {
    range += 0.2
    document.querySelector(`#${targetId}`).setAttribute("data-range", range);
    updateSliderRange(range);
    if (checkToggle()) {
      fetchJammingJSON(target, range)
    } else {
      fetchCallingJSON(target, range)
    }
  }
}

function decrementRange(target, range) {
  let targetId = target.getAttribute("id")
  if (range > 0) {
    range -= 0.2
    document.querySelector(`#${targetId}`).setAttribute("data-range", range)
    updateSliderRange(range)
    if (checkToggle()) {
      fetchJammingJSON(target, range)
    } else {
      fetchCallingJSON(target, range)
    }
  }
}

function updateSliderRange(range) {
  document.querySelector("#range-value").innerText = range.toFixed(1);
}

function checkToggle() {
  let toggle = document.getElementById("mySwitch");
  if (toggle.checked === true) {
    return true
  } else {
    return false
  }
}

function colorizeRange(target, filteredStringArr, filteredObjArr) {
  let table = document.getElementById(target.getAttribute("id"));
  let tableId = table.getAttribute("id");
  let tds = document.querySelectorAll(`#${tableId} td`);
  let bottomRange = filteredStringArr.slice(-4);
  let callingRange = filteredStringArr;
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



