import { useEffect, useState } from "react";
import { fetchPopularMovies } from "./api/tmdbApi";

function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchPopularMovies().then(setMovies);
    }, []);

    return (
        <div>
            <h1>Popular Movies App</h1>
            <ul>
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <li key={movie.id}>{movie.title}</li>
                    ))
                ) : (
                    <p>Loading movies...</p>
                )}
            </ul>
        </div>
    );
}

export default App;
