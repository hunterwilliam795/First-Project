var input = document.getElementById('searchInput').value.trim()
var button = document.getElementById('searchButton')
function searchButton() {
    movieSearch()
}

function movieSearch() {
    var Apilink = "http://www.omdbapi.com/?t=" + input + "&apikey=8828c04b"
    fetch(Apilink)
        .then(function (response) {
            return response.json()            
        }
        )
        .then(function (data) {
            console.log(data);
        })
        .then(function(){
            input = document.getElementById('searchInput').value.trim()
        })
        .catch(function (error) {
            console.log('Unable to connect to API', error)
        })
    }
    
