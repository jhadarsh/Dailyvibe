// const apiKey = 'YOUR_OMDB_API_KEY';

async function searchMovie() {
    const movieTitle = document.getElementById('searchInput').value;
    if (!movieTitle) {
        alert("Please enter a movie title!");
        return;
    }
    // http://www.omdbapi.com/?i=tt3896198&apikey=84a53a9e
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=84a53a9e`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === "True") {
            displayMovie(data);
        } else {
            document.getElementById('movieDetails').innerHTML = `<p>Movie not found!</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('movieDetails').innerHTML = `<p>Could not fetch data. Please try again.</p>`;
    }
}

function displayMovie(movie) {
    document.getElementById('movieDetails').innerHTML = `
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="Movie Poster">
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
    `;
}
