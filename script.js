function searchButton() {
var input = document.getElementById('searchInput').value.toLowerCase()
var searchOutput = search(input)

displayResults(results);
}