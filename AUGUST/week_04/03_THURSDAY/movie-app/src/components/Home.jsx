import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "55dc8e9";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError("Something went wrong!");
      setMovies([]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Movie Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link> ({movie.Year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
