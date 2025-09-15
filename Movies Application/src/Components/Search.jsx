
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
    else {
      alert("Please enter movie name to search for..!")
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="row g-2 align-items-center">
      <div className="col-9 col-sm-9 col-lg-11 btnSearchContainer">
        <input
          type="text"
          className="serachInput"
          placeholder={t("Search and Explore...")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="col-3 col-sm-3 col-lg-1 d-grid">
        <button className="SearchButton" onClick={handleSearch}>
          {t("Search")}
        </button>
      </div>
    </div>
  );
}

export default Search;
