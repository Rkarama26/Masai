import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = useRef(1); 
  const [page, setPage] = useState(1); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await res.json();
      setCharacters(data.results.slice(0, 10));
      setTotalPages(data.info.pages);
      currentPage.current = page; // update ref
      setLoading(false);
    };
    fetchData();
  }, [page]);

  const handlePageClick = (num) => {
    setPage(num);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Rick and Morty Characters</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "15px",
          }}
        >
          {characters.map((char) => (
            <div
              key={char.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={char.image}
                alt={char.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h4>{char.name}</h4>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handlePageClick(num)}
            style={{
              margin: "0 5px",
              padding: "8px 12px",
              border: "none",
              borderRadius: "5px",
              backgroundColor:
                currentPage.current === num ? "#007bff" : "#e0e0e0",
              color: currentPage.current === num ? "white" : "black",
              cursor: "pointer",
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
