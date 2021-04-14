//import { Nano } from "../../node_modules/nanoscopic-js/index.js";
import { Nano } from "nanoscopic-js";

var { Build, createState, BindListener, Route } = Nano();

function Header() {
  return `<div component='Header' class='header'>
   <h1>Nano webApp demo.</h1> 
   <a href='javascript:void(0)' linkto='/about'>About this site</a>
  </div>`;
}

function MainContent() {
  const [movieList, changeMovieList] = createState(
    "",
    render,
    MainContent.name
  );

  function clicker(e) {
    e.preventDefault();
    let input = document.getElementById("changelistener");
    if (!input) return;
    // changeMovieName(input.value);
    let searchTerm = input.value;
    let baseurl = "http://www.omdbapi.com/";
    let key = "dff1d0c6";

    fetch(`${baseurl}?apikey=${key}&s=${searchTerm}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        changeMovs(json.Search[0].Title);
        listUpdate(json.Search);
      });
  }

  function render(state) {
    return `<div component='MainContent' class='maincontent'>
 <h2>A simple SPA created using the <a target='blank' href='https://www.npmjs.com/package/nanoscopic-js'>nanoscopic</a> framework</h2>
      <div class='maincontainer'>
      <p>Find movie info</p>
      <form>
        <input type='text' id='changelistener' placeholder='type a movie name'/>
        <button type='submit' onTouch=${BindListener(
          clicker
        )} name='submit'>Search</button>
      </form>
      </div>
      </div>`;
  }
  return render(movieList());
}

function MovieList() {
  return renderfuncList.render(movieList());
}
function selectMovie(id) {
  console.log(id);
  let baseurl = "http://www.omdbapi.com/";
  let key = "dff1d0c6";

  fetch(`${baseurl}?apikey=${key}&i=${id}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      changeMovs(json);
    })
    .then(() => {
      var el = document.querySelector(".movie");
      el.scrollIntoView({ behavior: "smooth", block: "end" });
    });

  console.log("movie selected");
}
MovieList.prototype.render = function render(state) {
  return `<div component='MovieList' class='movielist'> ${
    typeof state === "string"
      ? `<h4>movies will appear here</h4> `
      : state
          .map((movie) => {
            return `<div class='listitem' onTouch=${BindListener(() => {
              selectMovie(movie.imdbID);
            })}>
            <img src=${movie.Poster} alt='coverimg'/>
      <h3>${movie.Title}</h3>
      <span>${movie.Year}</span>
      </div>`;
          })
          .join("")
  }</div>`;
};
//movie list
var renderfuncList = Object.assign(MovieList.prototype, {});

var [movieList, listUpdate] = createState(
  "",
  renderfuncList.render,
  MovieList.name
);

//each movie
function Movie() {
  return renderfunc.render(movs());
}

Movie.prototype.render = function render(state) {
  return `<div component='Movie' class='movie'> ${
    typeof state === "object"
      ? `<div class='singlemovie' id='singlemovie'>
      <img src=${state.Poster}/>
      <div class='movieinfo'>
      <h2>${state.Title} <span>${state.imdbRating}</span></h2>
      <div class='plot'>
      <p>${state.Plot}</p>
      </div>
      <div class='row'>
      <h4>Box Office:</h4>
      <p>${state.BoxOffice}
      </div>
      <div class='row'>
      <h4>Director:</h4>
      <p>${state.Director}</p>
      </div>
      <div class='row'>
      <h4>Actors:  </h4>
      <p class='actors'>${state.Actors}</p>
      </div>
      </div>
      </div>`
      : ""
  }</div>`;
};

var renderfunc = Object.assign(Movie.prototype, {});

var [movs, changeMovs] = createState("movs", renderfunc.render, Movie.name);

function Footer() {
  return `<div class='footer'>Made by Davedarsa @ <a href='https://github.com/davedarsa'><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"/></a></div>`;
}

function About() {
  return `<div component='About' class='about'>
  
  <h1>You just witnessed the Nano router in action</h1>
  <h2>What's the point of Nano?</h2>
  <p>I just wanted to showcase the framework features with a simple webapp that uses the OMDB API.</p>
  <p>To check out the source code of this site, on <a href='https://github.com/DaveDarsa/nanoproject' target='blank'>Github</a></p>
  <p class='desc'>To learn more about Nanoscopic-js, check it out on <a href='https://www.npmjs.com/package/nanoscopic-js' target='blank'>Npm</a> or <a href='https://github.com/DaveDarsa/nanoscopic' target='blank'>Github</a></p>
  <h4>Note: since props aren't as well mainteined as states in the framework, I had to get a little creative and expose 
  movies state to all other components</h4>
  <a href="#" linkto='/' class='btn'>Get back to main</a>
  </div> `;
}

//without router
// Build("root", Header, MainContent, About);

// //with router
Build(
  "root",
  Route("/", [Header, MainContent, MovieList, Movie, Footer]),
  Route("/about", [About])
);
