import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "55dc8e9";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const data = await res.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch {
        setError("Something went wrong!");
      }
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <Link to="/">Back to Search</Link>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} style={{ width: "200px" }} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  );
};

export default MovieDetail;
