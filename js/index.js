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
      let rangeValue = (parseInt(e.target.getAttribute("data-range")))
      slider.innerHTML = `<span id="range-value">${rangeValue}%</span>`;
    })
  }
}


function addSliderListeners() {
  let slider = document.getElementById("range-slider");
  slider.addEventListener("mouseenter", (e) => {
    console.log(e.target)
  })
}

function highlightRange() {

}