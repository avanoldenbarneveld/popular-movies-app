import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
            .then(response => setMovie(response.data))
            .catch(error => console.error("Error fetching movie details:", error));
    }, [id]);

    if (!movie) return <h2>Loading...</h2>;

    return (
        <div className="container">
            <h1>{movie.title}</h1>
            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average}</p>
            <p>{movie.overview}</p>
        </div>
    );
}

export default MovieDetails;
