var input = document.getElementById('searchInput')
var button = document.getElementById('searchButton')
function searchButton() {
    movieSearch()
}
function movieSearch() {
    // Get the input value
    var input = document.getElementById('searchInput').value.trim();
    // Check if the input is empty
    if (input === '') {
        console.log('Please enter a valid movie title');
        return;
    }
    // Construct the API link with the input value
    var ApiLink = "http://www.omdbapi.com/?t=" + input + "&apikey=8828c04b";
    // Fetch data from the API
    fetch(ApiLink)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
            console.log(data)
            displaydata(data);
        })
        .catch(function (error) {
            console.log('Unable to connect to API', error);
        });
}




function callAnotherApi(imdbID) {
    // Construct the URL for another API using the IMDb ID
    var anotherApiLink = "https://api.watchmode.com/v1/title/" + imdbID + "/details/?apiKey=gbtBZz63F1Z3XpKrBv42YSF7ka3yzuCSldKKJ1ZX"

    // Fetch data from the other API
    fetch(anotherApiLink)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
            console.log(data.trailer);
            // Process data from the other API as needed
        })
        .catch(function (error) {
            console.log('Unable to connect to another API', error);
        });
}


let player;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '315',
      width: '560',
      videoId: data.trailer, // Replace with your video ID or dynamically set it based on your API response
      playerVars: {
        'autoplay': 1,
        'autohide': 1,
        'wmode': 'transparent',
        'controls': 1,
        'enablejsapi': 1,
        'fs': 1,
        'playsinline': 0,
        'rel': 0,
        'showinfo': 0,
        'modestbranding': 1,
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function onPlayerReady(event) {
    // You can do something when the player is ready
  }

  function onPlayerStateChange(event) {
    // You can do something when the player state changes
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
     // Trailer
     if (data.trailer) {
        var trailerContainer = document.createElement('div');
        trailerContainer.style.marginTop = '20px';

        var trailerElement = document.createElement('iframe');
        trailerElement.src = data.trailer;
        trailerElement.width = '560';
        trailerElement.height = '315';
        trailerElement.frameBorder = '0';
        trailerElement.allowFullscreen = true;

        trailerContainer.appendChild(trailerElement);
        textContainer.appendChild(trailerContainer);
    }

}