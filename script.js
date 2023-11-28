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
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.log('Unable to connect to API', error);
        });
}
