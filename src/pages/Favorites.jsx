import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter(movie => movie.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="container">
            <h1>My Favorites</h1>
            <div className="movies-grid">
                {favorites.length > 0 ? (
                    favorites.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <Link to={`/movie/${movie.id}`}>
                                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                                <h3>{movie.title}</h3>
                            </Link>
                            <button
                                className="favorite-button"
                                onClick={() => removeFromFavorites(movie.id)}
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No favorite movies yet.</p>
                )}
            </div>
        </div>
    );
}

export default Favorites;
