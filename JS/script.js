let myLibrary = [];
let seenSelect = document.querySelector("#watched");

function Movie(title, director, hours, minutes, seen) {
  this.title = title;
  this.director = director;
  this.duration = `${hours}hs ${minutes}min`;
  this.seen = seen;
}

Movie.prototype.addText = function () {
  return (
    "<b>Title:</b> " +
    this.title +
    "<br> <b>Director:</b> " +
    this.director +
    "<br> <b>Duration: </b>" +
    this.duration +
    "<br>"
  );
};

Movie.prototype.seenIt = function (button) {
  if (button.textContent === "seen") {
    return (button.textContent = "not-seen");
  } else {
    return (button.textContent = "seen");
  }
};

Movie.prototype.checkSeen = function (button) {
  if (button.textContent === "seen") {
    button.classList.remove("not-seenBtn");
    button.classList.add("seenBtn");
  } else {
    button.classList.remove("seenBtn");
    button.classList.add("not-seenBtn");
  }
};

function addMovieToLibrary(obj) {
  myLibrary.push(obj);
}

function addMovieToDom() {
  myLibrary.forEach((film) => {
    const movie = document.createElement("div");
    movie.classList.add("movie");

    movieContainer.appendChild(movie);

    movie.innerHTML = film.addText();

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Movie";
    deleteButton.classList.add("deleteButton");
    movie.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
      myLibrary.splice(myLibrary.indexOf(film), 1);
      movieContainer.innerHTML = "";
      addMovieToDom();
    });

    const seenBtn = document.createElement("button");
    seenBtn.textContent = film.seen;
    movie.appendChild(seenBtn);

    film.checkSeen(seenBtn);

    seenBtn.addEventListener("click", () => {
      film.seen = film.seenIt(seenBtn);
      film.checkSeen(seenBtn);
    });
  });
}

function createFilm(film) {}

// const noCountry = new Movie(
//   "No country for old men",
//   "Cohen Brothers",
//   "2",
//   "2"
// );

// const inTheMood = new Movie("In the mood for love", "Wong Kar-wai", "1", "38");

const movieContainer = document.querySelector(".movie-container");

// addMovieToLibrary(noCountry);
// addMovieToLibrary(inTheMood);
// addMovieToDom();

// Form

const movieName = document.querySelector("#name");
const director = document.querySelector("#director");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");

// const addMovieBtn = document.getElementById("addMovieBtn");

addMovieBtn.addEventListener("click", () => {
  movieContainer.innerHTML = "";
  const film = new Movie(
    movieName.value,
    director.value,
    hours.value,
    minutes.value,
    seenSelect.value
  );

  addMovieToLibrary(film);
  addMovieToDom();
});
