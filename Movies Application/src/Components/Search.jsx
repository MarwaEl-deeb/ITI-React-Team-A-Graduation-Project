
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleSearch();
    }
  };

  return (
    <div className="row">
      <div className="col-9 col-lg-10 btnSearchContainer">
        <input
          type="text"
          className="serachInput"
          placeholder="Search and Explore..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
      </div>

      <div className="col-3 col-lg-2">
        <button className="SearchButton" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
