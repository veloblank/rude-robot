window.onload = addListeners();

function addListeners() {
  let tables = document.getElementsByClassName("grid");
  let slider = document.getElementById("range-slider");
  for (let table of tables) {
    table.addEventListener("mouseenter", (e) => {
      table.addEventListener("click", () => {
        let rangeValue = (parseInt(e.target.getAttribute("data-range")))
        console.log(rangeValue)
        slider.innerHTML = rangeValue + "%";
      })
    })
  }
}