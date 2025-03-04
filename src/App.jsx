import { useEffect, useState } from "react";
import { fetchPopularMovies } from "./api/tmdbApi";
import "./App.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchPopularMovies().then(setMovies);
    }, []);

    return (
        <div className="container">
            <h1>Popular Movies</h1>
            <div className="movies-grid">
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                            <h3>{movie.title}</h3>
                        </div>
                    ))
                ) : (
                    <p>Loading movies...</p>
                )}
            </div>
        </div>
    );
}

export default App;
