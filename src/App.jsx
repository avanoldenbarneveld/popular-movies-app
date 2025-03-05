import { useEffect, useState } from "react";
import { fetchPopularMovies } from "./api/tmdbApi";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchPopularMovies().then(setMovies);
    }, []);

    return (
        <div>
            <h1>🎬 Popular Movies</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id} style={{ textAlign: "center" }}>
                            <img 
                                src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
                                alt={movie.title} 
                                style={{ width: "100%", borderRadius: "8px" }}
                            />
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
