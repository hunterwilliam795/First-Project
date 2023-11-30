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


function displaydata(data) {
    displayArea = document.getElementById('displayArea');
    displayArea.innerHTML = '';

    // Container for Poster and Text
    container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'flex-start';

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
    
}