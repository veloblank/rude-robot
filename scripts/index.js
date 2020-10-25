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
  let currentIndex = currentStep();
  if (currentIndex === 0) {
    range = fullRange
  } else {
    range = fullRange.slice(0, currentIndex);
  }
  let worstHand = range[range.length - 1];
  let shortRange = getShortRange(range, currentIndex);
  calcRange(range, worstHand, shortRange)
}

function getShortRange(range, idx) {
  let lower = idx - 5;
  let upper = idx + 10;
  if (idx <= 4) {
    return range.slice(0, upper)
  } else if (idx > 164) {
    return range.slice(lower, 169)
  } else if (idx > 4) {
    return range.slice(lower, upper)
  }
}


function incrementAndWriteRange(delta) {
  let step = currentStep();
  if (step < 170) {
    step += delta
    document.getElementById("grid-1").setAttribute("data-step_index", step)
    return step
  } else {
    return step
  }
}

function decrementAndWriteRange(delta) {
  let step = currentStep();
  if (step <= 0) {
    return step
  } else {
    step -= 1
    document.getElementById("grid-1").setAttribute("data-step_index", step)
    return step
  }
}

function currentStep() {
  return parseInt(document.getElementById("grid-1").getAttribute("data-step_index"))
}

function calcRange(rangeArr, worstHandObj, shortArr) {
  let handStringValues = [];
  let range = rangeArr;
  let hand = worstHandObj;
  let shortRange = shortArr;
  for (let hand of range) {
    handStringValues.push(hand.code)
  }
  colorizeRange(handStringValues, range, hand, shortRange)
}

function colorizeRange(handStringValues, handRange, hand, shortRange) {
  let fullRange = "";
  let table = document.getElementById("grid-1");
  let tableId = table.getAttribute("id");
  let tds = document.querySelectorAll(`#${tableId} td`);
  let range = handRange;
  let bottomOfRange = hand;
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
}

function matchHandStringwithHandObject(targetString) {
  let result;
  let checkHand = (a, i) => {
    if (a.code == targetString) {
      result = results[i];
    }
  }
  results.some(checkHand)
  return result
};