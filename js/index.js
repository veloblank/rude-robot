window.onload = addListeners();

function addListeners() {
  addTableListeners();
  addSliderListeners();
}

function addTableListeners() {
  let tables = document.getElementsByClassName("grid");
  let slider = document.getElementById("range-slider");
  for (let table of tables) {
    table.addEventListener("mouseenter", (e) => {
      table.onwheel = scrollNumbers;
    })
  }
}

function addSliderListeners() {
  let slider = document.getElementById("range-slider");
}

function scrollNumbers(e) {
  e.preventDefault()
  let target = e.target
  if (!!target.classList && target.classList[0].includes("grid")) {
    let targetDataRange = parseInt(target.getAttribute("data-range"))
    let newDivValue;
    if (e.deltaY < 0) {
      newDivValue = targetDataRange + 1
      target.setAttribute("data-range", newDivValue)
      console.log(target.getAttribute("data-range"))
      slider.innerHTML = `<span id="range-value">${rangeInt}%</span>`;
    } else {
      newDivValue = targetDataRange - 1
      target.setAttribute("data-range", newDivValue)
      slider.innerHTML = `<span id="range-value">${rangeInt}%</span>`;
    }
    console.log(target)
  } else {
    console.log(target)
  }
}
