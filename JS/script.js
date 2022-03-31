localStorage;

Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

let myLibrary = [];

class Movie {
  constructor(title, director, hours, minutes, seen) {
    this.title = title;
    this.director = director;
    this.hours = hours;
    this.minutes = minutes;
    this.duration = `${this.hours}hs ${this.minutes}min`;
    this.seen = seen;
  }

  addText() {
    return (
      '<b>Title:</b> ' +
      this.title +
      '<br> <b>Director:</b> ' +
      this.director +
      '<br> <b>Duration: </b>' +
      this.duration +
      '<br>'
    );
  }

  seenIt(button) {
    if (button.textContent === 'seen') {
      return (button.textContent = 'not-seen');
    } else {
      return (button.textContent = 'seen');
    }
  }

  checkSeen(button) {
    if (this.seen === 'seen') {
      button.classList.remove('not-seenBtn');
      button.classList.add('seenBtn');
    } else {
      button.classList.remove('seenBtn');
      button.classList.add('not-seenBtn');
    }
    resetStorage();
  }
}

function addMovieToLibrary(obj) {
  myLibrary.push(obj);
  localStorage.clear();
  localStorage.setObj('library', myLibrary);
  console.log(localStorage);
  console.log('library', myLibrary);
}

function addMovieToDom() {
  myLibrary.forEach((film) => {
    const movie = document.createElement('div');
    movie.classList.add('movie');

    movieContainer.appendChild(movie);

    movie.innerHTML = film.addText();

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Movie';
    deleteButton.classList.add('deleteButton');
    movie.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
      myLibrary.splice(myLibrary.indexOf(film), 1);
      movieContainer.innerHTML = '';
      addMovieToDom();
      resetStorage();
    });

    const seenBtn = document.createElement('button');
    seenBtn.textContent = film.seen;
    movie.appendChild(seenBtn);

    film.checkSeen(seenBtn);

    seenBtn.addEventListener('click', () => {
      film.seen = film.seenIt(seenBtn);
      film.checkSeen(seenBtn);
    });
  });
}

const movieContainer = document.querySelector('.movie-container');

const movieName = document.querySelector('#name');
const director = document.querySelector('#director');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
let seenSelect = document.querySelector('#watched');

addMovieBtn.addEventListener('click', () => {
  if (
    movieName.value !== '' &&
    director.value !== '' &&
    hours.value !== '' &&
    minutes.value !== ''
  ) {
    movieContainer.innerHTML = '';
    const film = new Movie(
      movieName.value,
      director.value,
      hours.value,
      minutes.value,
      seenSelect.value
    );

    addMovieToLibrary(film);
    addMovieToDom();
  }
});

function checkStorage() {
  if (localStorage.getObj('library') !== null) {
    let newLibrary = localStorage.getObj('library');
    console.log('new', newLibrary);
    newLibrary.forEach((movie) => {
      const film = new Movie(
        movie.title,
        movie.director,
        movie.hours,
        movie.minutes,
        movie.seen
      );
      myLibrary.push(film);
    });
    addMovieToDom();
  }
}

function resetStorage() {
  localStorage.clear();
  localStorage.setObj('library', myLibrary);
}

checkStorage();
