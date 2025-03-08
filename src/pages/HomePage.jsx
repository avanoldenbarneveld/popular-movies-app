import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../api/tmdbApi";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [sortOption, setSortOption] = useState("popularity");

    useEffect(() => {
        fetchPopularMovies().then(data => {
            sortMovies(data, sortOption);
        });
    }, [sortOption]);

    const sortMovies = (movies, option) => {
        const sortedMovies = [...movies].sort((a, b) => {
            if (option === "rating") {
                return b.vote_average - a.vote_average;
            } else {
                return b.popularity - a.popularity;
            }
        });
        setMovies(sortedMovies);
    };

    return (
        <div className="container">
            <h1>Popular Movies</h1>

            <div style={{ marginBottom: "20px" }}>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="popularity">Sort by Popularity</option>
                    <option value="rating">Sort by Rating</option>
                </select>
            </div>

            <div className="movies-grid">
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <Link to={`/movie/${movie.id}`}>
                                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                                <h3>{movie.title}</h3>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Loading movies...</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;
