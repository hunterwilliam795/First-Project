var input = document.getElementById('searchInput')
var button = document.getElementById('searchButton')
function searchButton() {
  movieSearch()
}

function movieSearch() {
  var input = document.getElementById('searchInput').value.trim();

  if (input === '') {
    console.log('Please enter a valid movie title');
    return;
  }

  var searchApiLink = "https://www.omdbapi.com/?s=" + input + "&apikey=8828c04b";
  fetch(searchApiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      if (data.Search) {
        
        var imdbIDs = data.Search.map(function (movie) {
          return movie.imdbID;
        });

        getMovieDetails(imdbIDs);
      } else {
        console.log('No search results found');
      }
    })
    .catch(function (error) {
      console.log('Unable to connect to API', error);
    });
}

function getMovieDetails(imdbIDs) {
  imdbIDs.forEach(function (imdbID) {
    var detailApiLink = "https://www.omdbapi.com/?i=" + imdbID + "&apikey=8828c04b";
    fetch(detailApiLink)
      .then(function (response) {
        return response.json();
      })
      .then(function (movieDetails) {
        console.log('Movie Details:', movieDetails);
        displayMovieDetails(movieDetails);
      })
      .catch(function (error) {
        console.log('Unable to fetch movie details', error);
      });
  });
}




function callAnotherApi(imdbID) {
  var anotherApiLink = "https://api.watchmode.com/v1/title/" + imdbID + "/details/?apiKey=gbtBZz63F1Z3XpKrBv42YSF7ka3yzuCSldKKJ1ZX"


  fetch(anotherApiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.trailer)
      getlink(data);
    })
    .catch(function (error) {
      console.log('Unable to connect to another API', error);
    });
}

function getlink(data) {
  var youtubeLink = data.trailer;
  var videoId = extractVideoId(youtubeLink);
  console.log(videoId);

  playerElement = document.getElementById('player');

  while (playerElement.firstChild) {
    playerElement.removeChild(playerElement.firstChild);
  }

  iframeElement = document.createElement('iframe');
  iframeElement.width = "420";
  iframeElement.height = "315";
  playerElement.marginTop = "-100"
  playerElement.style.display = "absolute"
  iframeElement.src = `https://www.youtube.com/embed/${videoId}`;

  ;

  playerElement.appendChild(iframeElement);


}

function extractVideoId(url) {
  // Regular expression to match YouTube video ID in various URL formats
  var regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  var match = url.match(regExp);


  // If there's a match, return the video ID, otherwise return null
  return match ? match[1] : null;

}

function displaydata(data) {
  displayArea = document.getElementById('displayArea');
  displayArea.innerHTML = '';


  // Container for Poster and Text
  container = document.createElement('div');
  container.style.display = 'flex';



  // Poster Element
  posterElement = document.createElement('img');
  posterElement.src = data.Poster;
  posterElement.alt = 'Movie Poster';
  posterElement.style.marginRight = '10px';
  posterElement.style.width = "150px";
  container.appendChild(posterElement);

  // Text Elements
  textContainer = document.createElement('div');
  textContainer.style.maxWidth = '600px';


  // Title Element
  titleElement = document.createElement('h3');
  titleElement.textContent = 'Title: ' + data.Title;
  textContainer.appendChild(titleElement);

  // Runtime Element
  runtimeElement = document.createElement('h2');
  runtimeElement.textContent = 'Runtime: ' + data.Runtime;
  textContainer.appendChild(runtimeElement);

  // Release Date Element
  releasedateElement = document.createElement('h2');
  releasedateElement.textContent = 'Release Date: ' + data.Released;
  textContainer.appendChild(releasedateElement);

  // Actors
  actorsElement = document.createElement('h2');
  actorsElement.textContent = 'Actors: ' + data.Actors;
  textContainer.appendChild(actorsElement);
  container.appendChild(textContainer);
  displayArea.appendChild(container);

  // Plot
  plotElement = document.createElement('p');
  plotElement.textContent = 'Plot: ' + data.Plot;
  textContainer.appendChild(plotElement);

  // MetaScore
  metaElement = document.createElement('h2');
  metaElement.textContent = 'Health Meter: ' + data.Metascore;
  textContainer.appendChild(metaElement);


  callAnotherApi(data.imdbID);
  // // Trailer
  if (data.trailer) {
    var trailerContainer = document.createElement('div');
    trailerContainer.style.marginTop = '20px';

    iframeElement = document.createElement('iframe');
    iframeElement.width = "420";
    iframeElement.height = "315";
    iframeElement.src = `https://www.youtube.com/embed/${videoId}`;
    playerElement = document.getElementById('player');
    playerElement.appendChild(iframeElement);

    trailerContainer.appendChild(trailerElement);
    textContainer.appendChild(trailerContainer);
  }

}