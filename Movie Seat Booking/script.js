const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let price = +movieSelect.value;
populateUI();

function storeMovieData(movieSelectedIndex, moviePrice) {
  localStorage.setItem("SelectedMovieIndex", movieSelectedIndex);
  localStorage.setItem("MoviePrice", moviePrice);
}

function updatePrice() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndices = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndices));

  const countSeat = selectedSeats.length;
  count.innerHTML = countSeat;
  const amount = countSeat * price;
  total.innerHTML = amount;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  seats.forEach((seat, index) => {
    if (selectedSeats !== null && selectedSeats.length > 0) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    }
  });
  const selectedMovieIndex = +localStorage.getItem("SelectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  const moviePrice = +localStorage.getItem("MoviePrice");
  if (moviePrice !== null) {
    price = moviePrice;
  }
  updatePrice();
}

movieSelect.addEventListener("change", (event) => {
  price = +event.target.value;
  storeMovieData(event.target.selectedIndex, event.target.value);
  updatePrice();
});

container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
    updatePrice();
  }
});
