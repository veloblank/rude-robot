window.onload = addListeners();
let results;

function addListeners() {
  addTableListener();
  addClickListeners();
  renderFetchResults();
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
  let button = document.querySelector("#mySwitch");
  button.addEventListener("input", () => {
    let bool = checkToggle();
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
  } else {
    results = results.bloch_call
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

function constructRangePeripherals(results) {
  let range;
  let fullRange = results;
  let currentIndex = getCurrentStep();
  if (currentIndex === 0) {
    range = fullRange
  } else {
    range = fullRange.slice(0, currentIndex);
  }
  let worstHand = range[range.length - 1];
  let shortRange = getShortRange(range, currentIndex);
  calcRange(range, worstHand, shortRange)
}

function getShortRange(range, worstHandIdx) {
  let lower = worstHandIdx - 5;
  let upper = worstHandIdx + 10;
  if (worstHandIdx <= 4) {
    return range.slice(0, upper)
  } else if (worstHandIdx > 164) {
    return range.slice(lower, 169)
  } else if (worstHandIdx > 4) {
    return range.slice(lower, upper)
  }
}

function incrementAndWriteRange(delta) {
  let step = getCurrentStep();
  if (step < 170) {
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

function calcRange(rangeArr, worstHandObj, shortArr, idx) {
  let hand = worstHandObj;
  let shortRange = shortArr;
  let handStringValues = getHandStringValues(rangeArr)
  colorizeRange(handStringValues, shortRange, rangeArr, hand)
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

function colorizeRange(handStringValues, shortRange) {
  let fullRange = "";
  let table = document.getElementById("grid-1");
  let tableId = table.getAttribute("id");
  let tds = document.querySelectorAll(`#${tableId} td`);
  let bannerRange = shortRange;
  if (handStringValues.length)
    for (let td of tds) {
      if (handStringValues.includes(`${td.getAttribute("id")}`)) {
        document.querySelector(`#${td.getAttribute("id")}`).classList.add("click-highlight")
      } else {
        document.querySelector(`#${td.getAttribute("id")}`).classList.remove("click-highlight")
      }
    }
  let i = 0;
  for (let r of bannerRange) {
    if (i == 10) {
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
      fetchRangeFromBannerClick(e.target)
    })
  }
}

function fetchRangeFromBannerClick(hand) {
  let target = hand.getAttribute("data-var");
  matchHandStringwithHandObject(target)
  let range = getRangeUsingCurrentStep();
  let idx = getCurrentStep();
  let shortRange = getShortRange(range, idx)
  let values = getHandStringValues(range);
  colorizeRange(values, shortRange)

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