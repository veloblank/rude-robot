window.onload = addListeners();
let results;

function addListeners() {
  addTableListener();
  addClickListeners();
  renderFetchResults();
}

function addTableListener() {
  let main = document.querySelector("main");
  main.addEventListener("mouseenter", e => {
    addWheelListener(e.target);
  })
}



function addWheelListener(target) {
  target.onwheel = e => {
    e.preventDefault();
    let delta;
    if (e.deltaY < 0) {
      delta = 1
      incrementAndWriteRange(delta)
    } else if (e.deltaY > 0) {
      delta = -1
      decrementAndWriteRange(delta)
    }
    constructRangePeripherals(results)
  }
}

function addClickListeners() {
  let tds = document.querySelectorAll("td")
  for (let td of tds) {
    td.addEventListener("click", (e) => {
      let targetTd = e.target;
      getHandIdFromTd(targetTd);
    })
  }
  let button = document.querySelector("#mySwitch");
  button.addEventListener("input", () => {
    let bool = checkToggle();
    setCurrentStep(0)
    if (bool) {
      document.querySelector(".push-hands").classList.remove("hidden")
      document.querySelector(".call-hands").classList.add("hidden")
    } else {
      document.querySelector(".push-hands").classList.add("hidden")
      document.querySelector(".call-hands").classList.remove("hidden")
    }
    renderFetchResults();
  })
}

function checkToggle() {
  let mySwitch = document.getElementById("mySwitch")
  return mySwitch.checked == true ? true : false;
}

async function renderFetchResults() {
  let bool = checkToggle();
  results = await fetchRange(bool);
  if (bool) {
    results = results.bloch_jam
    buildJamHtml(results)
  } else {
    results = results.bloch_call
    buildCallHtml(results)
  }
}

async function fetchRange(bool) {
  let jsonFile;
  if (bool) {
    jsonFile = "../formatted_jamming.json"
  } else {
    jsonFile = "../formatted_calling.json"
  }
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

// PROGRAMMATICALLY CREATE AND ADD HTML DIVS

function buildCallHtml(arr) {
  let parentDiv = document.querySelector(".call-hands")
  parentDiv.innerHTML = ""
  for (let hand of arr) {
    let childDiv = document.createElement("div")
    childDiv.classList.add("hand", `${hand.type}`)
    childDiv.setAttribute("id", `${hand.code}`)
    childDiv.innerText = `${hand.string_f}`
    parentDiv.appendChild(childDiv);
  }
}

function buildJamHtml(arr) {
  let parentDiv = document.querySelector(".push-hands")
  parentDiv.innerHTML = ""
  for (let hand of arr) {
    let childDiv = document.createElement("div")
    childDiv.classList.add("hand", `${hand.type}`)
    childDiv.setAttribute("id", `${hand.code}`)
    childDiv.innerText = `${hand.string_f}`
    parentDiv.appendChild(childDiv);
  }
}

function constructRangePeripherals(results) {
  let range;
  let fullRange = results;
  let currentIndex = getCurrentStep();
  if (currentIndex === 0) {
    range = fullRange
  } else {
    range = fullRange.slice(0, currentIndex);
  }
  calcRange(range)
}

function getShortRange(range) {
  let idx = getCurrentStep();
  let lower = idx - 11;
  let upper = idx + 10;
  if (idx > 164) {
    return range.slice(lower, 169)
  } else if (idx < 6) {
    return range.slice(0, 11)
  } else if (idx > 4) {
    return range.slice(lower, upper)
  }
}

function incrementAndWriteRange(delta) {
  let step = getCurrentStep();
  if (step < 169) {
    step += delta
    document.getElementById("grid-1").setAttribute("data-step_index", step)
    return step
  } else {
    return step
  }
}

function decrementAndWriteRange(delta) {
  let step = getCurrentStep();
  if (step <= 0) {
    return step
  } else {
    step += delta
    return setCurrentStep(step)
  }
}

function getCurrentStep() {
  return parseInt(document.getElementById("grid-1").getAttribute("data-step_index"))
}

function setCurrentStep(step) {
  return document.getElementById("grid-1").setAttribute("data-step_index", step);
}

function calcRange(rangeArr) {
  let combos = Object.values(rangeArr).reduce((t, { combos }) => t + combos, 0)
  let percent = convertToPercent(combos)
  document.querySelector("#range-value").innerHTML = percent;
  let handStringValues = getHandStringValues(rangeArr)
  colorizeRange(handStringValues)
}

function getRangeUsingCurrentStep() {
  let idx = getCurrentStep();
  let range = results.slice(0, idx + 1);
  return range
}

function getHandStringValues(filteredRangeArr) {
  let handStringValues = [];
  let range = filteredRangeArr;
  for (let r of range) {
    handStringValues.push(r.code)
  }
  return handStringValues
}

function colorizeRange(handStringValues) {
  let lastHand = handStringValues.slice(-1)[0]
  let table = document.getElementById("grid-1");
  let tableId = table.getAttribute("id");
  let tds = document.querySelectorAll(`#${tableId} td`);
  if (handStringValues.length) {
    for (let td of tds) {
      if (checkToggle()) {
        if (handStringValues.includes(`${td.getAttribute("id")}`)) {
          document.querySelector(`#${td.getAttribute("id")}`).classList.add("click-highlight")
        } else {
          document.querySelector(`#${td.getAttribute("id")}`).classList.remove("click-highlight")
        }
      } else {
        document.querySelector(`#${td.getAttribute("id")}`).classList.remove("click-highlight")
        if (handStringValues.includes(`${td.getAttribute("id")}`)) {
          document.querySelector(`#${td.getAttribute("id")}`).classList.add("click-push-highlight")
        } else {
          document.querySelector(`#${td.getAttribute("id")}`).classList.remove("click-push-highlight")
        }
      }
    }
  }
  highlightListRangefromHand(lastHand)
}

function highlightListRangefromHand(lastHand) {
  let htmlListedHands = document.querySelectorAll(".hand")
  for (let hand of htmlListedHands) {
    hand.classList.remove("selected")
    let handId = hand.getAttribute("id")
    if (handId === lastHand) {
      hand.classList.add("selected")
    }
  }
}

function fetchRangeFromBannerClick(hand) {
  let target = getHandStringFromHand(hand);
  matchHandStringwithHandObject(target)
  let range = getRangeUsingCurrentStep();
  let values = getHandStringValues(range);
  colorizeRange(values)
}

function getHandStringFromHand(hand) {
  return hand.getAttribute("data-var");
}

function getHandIdFromTd(td) {
  let handString = td.getAttribute("id");
  setStepAndColorizeUsingString(handString)
}

function setStepAndColorizeUsingString(targetString) {
  let handObj;
  let index;
  let checkHand = (a, i) => {
    if (a.code == targetString) {
      handObj = results[i];
      index = i;
    }
  }
  results.some(checkHand)
  setCurrentStep(index + 1);
  constructRangePeripherals(results)
  highlightClickedDiv(targetString)
}

function highlightClickedDiv(handString) {
  let htmlListedHands = document.querySelectorAll(".hand")
  for (let hand of htmlListedHands) {
    hand.classList.remove("selected")
    let handId = hand.getAttribute("id")
    if (handId === handString) {
      hand.classList.add("selected")
    }
  }

}

function matchHandStringwithHandObject(targetString) {
  let handObj;
  let index;
  let checkHand = (a, i) => {
    if (a.code == targetString) {
      handObj = results[i];
      index = i;
    }
  }
  results.some(checkHand)
  setCurrentStep(index);
  return handObj;
};

function convertToPercent(combos) {
  return ((combos / 1326) * 100).toFixed(2) + "%"
}