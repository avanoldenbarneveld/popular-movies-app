import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../api/tmdbApi";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("popularity");

    useEffect(() => {
        fetchPopularMovies().then(data => {
            setMovies(data);
            setFilteredMovies(data);
            sortMovies(data, sortOption);
        });
    }, []);

    useEffect(() => {
        sortMovies(filteredMovies, sortOption);
    }, [sortOption]);

    const sortMovies = (movies, option) => {
        const sortedMovies = [...movies].sort((a, b) => {
            if (option === "rating") {
                return b.vote_average - a.vote_average;
            } else {
                return b.popularity - a.popularity;
            }
        });
        setFilteredMovies(sortedMovies);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = movies.filter(movie =>
            movie.title.toLowerCase().includes(query)
        );

        sortMovies(filtered, sortOption);
    };

    return (
        <div className="container">
            <h1>Popular Movies</h1>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
                
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-dropdown">
                    <option value="popularity">Sort by Popularity</option>
                    <option value="rating">Sort by Rating</option>
                </select>
            </div>

            <div className="movies-grid">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <Link to={`/movie/${movie.id}`}>
                                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                                <h3>{movie.title}</h3>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;
