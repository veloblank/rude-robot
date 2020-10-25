window.onload = addListeners();

function addListeners() {
  addTableListener();
  addClickListeners();
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
      calcRange(target, delta)
    } else if (e.deltaY > 0) {
      delta = -1
      calcRange(target, delta)
    }
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
  })
}

function checkToggle() {
  let mySwitch = document.getElementById("mySwitch")
  return mySwitch.checked == true ? true : false;
}

async function renderFetchResults(bool) {
  let results = await fetchRange(bool);
  if (bool) {
    results = results.bloch_jam
  } else {
    results = results.bloch_call
  }
  constructShortJsonRange(results)
}

async function fetchRange(bool) {
  console.log(bool)
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

function constructShortJsonRange(results) {
  let fullRange = Object.values(results);
  let currentIndex = currentStep();
  let worstHand = bottomOfRange(currentIndex);
  let indexOfWorstHand = findIndexOfHand(fullRange, worstHand);
  let range = fullRange.slice(0, indexOfWorstHand + 1);
  let shortRange = getShortRange(fullRange, indexOfWorstHand);
  // console.log(fullRange)
  // colorizeFromClick(range, hand, shortRange)
}

function bottomOfRange(arrFilteredObj) {
  return arrFilteredObj[arrFilteredObj.length - 1]
}

function findIndexOfHand(arr, hand) {
  let handCheck = (el) => el.code === hand;
  return (arr.findIndex(handCheck))
}

function getShortRange(fullRange, index) {
  return fullRange.slice((index - 5), (index + 6))
}

function calcRange(target, delta) {
  let gridTarget = target;
  let bool = checkToggle();
  if (delta > 0) {
    incrementAndWriteRange(gridTarget, delta)
  } else {
    decrementAndWriteRange(gridTarget, delta)
  }
  let index = currentStep();
  let fullRange = renderFetchResults(bool)
  //   let handStringValues = [];
  //   let filteredHandObjects = json.splice(0, index)
  //   json.some(function (a, i) {
  //     index = i;
  //     callingCombos += a.combos;
  //     handStringValues.push(a.code)
  //   });
  //   let lastHand = bottomOfRange(filteredHandObjects);
  //   let shortRange = getShortRange(json, index)
  //   colorizeRange(target, handStringValues, filteredHandObjects, lastHand, shortRange)
}

function incrementAndWriteRange(target, delta) {
  let step = currentStep();
  if (step < 100) {
    step += delta
    target.setAttribute("data-step_index", step)
    return step
  } else {
    return step
  }
}

function decrementAndWriteRange(target, delta) {
  let step = currentStep();
  if (step > 0) {
    step -= 1
    target.setAttribute("data-step_index", step)
    return step
  } else {
    return step
  }
}

function currentStep() {
  return parseInt(document.getElementById("grid-1").getAttribute("data-step_index"))
}








  // function colorizeFromClick(results, hand, shortRange) {
  //   let resultsArr = [];
  //   results.filter((el) => {
  //     resultsArr.push(el.code)
  //   })
  //   let tds = document.querySelectorAll("td");
  //   let fullRange = "";
  //   for (let td of tds) {
  //     if (resultsArr.includes(`${td.getAttribute("id")}`)) {
  //       document.querySelector(`#${td.getAttribute("id")}`).classList.add("click-highlight")
  //       document.querySelector(`#${td.getAttribute("id")}`).classList.remove("highlight")
  //     } else {
  //       document.querySelector(`#${td.getAttribute("id")}`).classList.remove("click-highlight")
  //       document.querySelector(`#${td.getAttribute("id")}`).classList.remove("highlight")
  //     }
  //   }
  //   let i = 0;
  //   for (let r of shortRange) {
  //     if (i == 5) {
  //       fullRange += `<span class="disp-hand selected" data-var="${r.code}">${r.string_f}</span >`
  //     } else {
  //       fullRange += `<span class="disp-hand" data-var="${r.code}">${r.string_f}</span >`
  //     }
  //     i++
  //   }

  //   document.getElementById("range").innerHTML = fullRange;
  //   let smallRange = document.querySelectorAll(".disp-hand");
  //   for (let range of smallRange) {
  //     range.addEventListener("click", (e) => {
  //       fetchRangeFromClick(e.target)
  //     })
  //   }
  // }

  // function colorizeRange(target, filteredArr, filteredObjArr, lastHand, shortRange) {
  //   let table = document.getElementById(target.getAttribute("id"));
  //   let tableId = table.getAttribute("id");
  //   let tds = document.querySelectorAll(`#${tableId} td`);
  //   let fullRange = filteredArr;
  //   for (let td of tds) {
  //     if (fullRange.includes(`${td.getAttribute("id")}`)) {
  //       document.querySelector(`#${td.getAttribute("id")}`).classList.add("click-highlight")
  //     } else {
  //       document.querySelector(`#${td.getAttribute("id")}`).classList.remove("highlight")
  //     }
  //   }
  //   let bottomRange = lastHand.code;
  //   fetchRangeFromClick(bottomRange)
  // }
