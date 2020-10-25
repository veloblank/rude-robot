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
      incrementRange(range, target)
    } else if (e.deltaY > 0) {
      decrementRange(range, target)
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
  renderFetchResults(bool, clickedHand)
}

function constructShortJsonRange(results, hand) {
  let handId;
  try {
    hand.getAttribute("data-var")
  } catch (e) {
    if (e instanceof TypeError) {
      handId = hand;
    } else if (hand.getAttribute("data-var") !== "") {
      handId = hand.getAttribute("data-var")
    } else {
      handId = hand.getAttribute("id")
    }
  }
  let fullRange = Object.values(results);
  let index = findIndexOfHand(fullRange, handId);
  let shortRange = getShortRange(fullRange, index);
  let range = fullRange.slice(0, index + 1);
  colorizeFromClick(range, hand, shortRange)
}

function getShortRange(fullRange, index) {
  return fullRange.slice((index - 5), (index + 6))
}

function findIndexOfHand(arr, hand) {
  let handCheck = (el) => el.code === hand;
  return (arr.findIndex(handCheck))
}

async function fetchRange(bool) {
  let jsonFile;
  bool ? jsonFile = "../formatted_jamming.json" : jsonFile = "../formatted_calling.json"
  try {
    const response = await fetch(jsonFile, {
      method: "GET",
      credentials: "same-origin"
    });
    let obj = await response.json();
    return obj;
  } catch (error) {
    console.log(error)
  }
}

async function renderFetchResults(bool, hand) {
  let results = await fetchRange(bool);
  if (bool) {
    results = results.bloch_jam
  } else {
    results = results.bloch_call
  }
  constructShortJsonRange(results, hand)
}

function colorizeFromClick(results, hand, shortRange) {
  let resultsArr = [];
  results.filter((el) => {
    resultsArr.push(el.code)
  })
  let tds = document.querySelectorAll("td");
  let fullRange = "";
  for (let td of tds) {
    if (resultsArr.includes(`${td.getAttribute("id")}`)) {
      document.querySelector(`#${td.getAttribute("id")}`).classList.add("click-highlight")
      document.querySelector(`#${td.getAttribute("id")}`).classList.remove("highlight")
    } else {
      document.querySelector(`#${td.getAttribute("id")}`).classList.remove("click-highlight")
      document.querySelector(`#${td.getAttribute("id")}`).classList.remove("highlight")
    }
  }
  let i = 0;
  for (let r of shortRange) {
    if (i == 5) {
      fullRange += `<span class="disp-hand selected" data-var="${r.code}">${r.string_f}</span >`
    } else {
      fullRange += `<span class="disp-hand" data-var="${r.code}">${r.string_f}</span >`
    }
    i++
  }
  document.getElementById("range").innerHTML = fullRange;
  let smallRange = document.querySelectorAll(".disp-hand");
  for (let range of smallRange) {
    range.addEventListener("click", (e) => {
      fetchRangeFromClick(e.target)
    })
  }
}

function incrementRange(range, target) {
  let targetId = target.getAttribute("id");
  if (range < 100) {
    range += 0.2
    document.querySelector(`#${targetId} `).setAttribute("data-range", range);
    updateSliderRange(range);
    if (checkToggle()) {
      fetchJammingJSON(range, target)
    } else {
      fetchCallingJSON(range, target)
    }
  }
}

function decrementRange(range, target) {
  let targetId = target.getAttribute("id")
  if (range > 0) {
    range -= 0.2
    document.querySelector(`#${targetId} `).setAttribute("data-range", range)
    updateSliderRange(range)
    if (checkToggle()) {
      fetchJammingJSON(range, target)
    } else {
      fetchCallingJSON(range, target)
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

function colorizeRange(target, filteredArr, filteredObjArr, lastHand, shortRange) {
  let table = document.getElementById(target.getAttribute("id"));
  let tableId = table.getAttribute("id");
  let tds = document.querySelectorAll(`#${tableId} td`);
  let fullRange = filteredArr;
  for (let td of tds) {
    if (fullRange.includes(`${td.getAttribute("id")}`)) {
      document.querySelector(`#${td.getAttribute("id")}`).classList.add("click-highlight")
    } else {
      document.querySelector(`#${td.getAttribute("id")}`).classList.remove("highlight")
    }
  }
  let bottomRange = lastHand.code;
  fetchRangeFromClick(bottomRange)
}

function fetchJammingJSON(range, target) {
  fetch("../formatted_jamming.json")
    .then(response => response.json())
    .then(json => {
      let blochJamming = json.bloch_jam;
      calcRange(blochJamming, target, range)
    })
}

function fetchCallingJSON(range, target) {
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
  let lastHand = (filteredHandObjects[filteredHandObjects.length - 1])
  let shortRange = getShortRange(json, index)
  colorizeRange(target, handStringValues, filteredHandObjects, lastHand, shortRange)
}

function convertToPercent(combos) {
  return (combos / 1326) * 100
}



