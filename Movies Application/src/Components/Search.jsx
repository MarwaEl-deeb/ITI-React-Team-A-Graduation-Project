import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="row g-2 align-items-center">
      <div className="col-9 col-sm-9 col-lg-11 btnSearchContainer">
        <input
          type="text"
          className="serachInput"
          placeholder="Search and Explore..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="col-3 col-sm-3 col-lg-1 d-grid">
        <button
          className="SearchButton"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
