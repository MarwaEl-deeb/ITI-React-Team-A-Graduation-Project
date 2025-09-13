import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { MainContext } from "../useContext";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedType, setSelectedType } = useContext(MainContext);
  const [localSelected, setLocalSelected] = useState(selectedType);

  // Sync local state with context and location
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedType("movies");
      setLocalSelected("movies");
    } else if (location.pathname === "/TV-Shows") {
      setSelectedType("tv");
      setLocalSelected("tv");
    }
  }, [location.pathname, setSelectedType]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    setLocalSelected(value);

    if (value === "movies") {
      navigate("/");
    } else if (value === "tv") {
      navigate("/TV-Shows");
    }
  };

  return (
    <nav>
      <div className="navbar navTitle">
        <strong className="navbar-brand">
          <select
            className="form-select"
            value={localSelected} // use local state
            onChange={handleChange}
          >
            <option value="movies">Movie App</option>
            <option value="tv">TV Shows</option>
          </select>
        </strong>
      </div>

      <div
        className="d-flex headerRightSide fw-bold"
        style={{ color: "#726625" }}
      >
        <select
          name="lang"
          className="form-select fw-bold"
          style={{ color: "#726625" }}
        >
          <option value="En">En</option>
          <option value="Ar">Ar</option>
        </select>

        <span className="watchListIcon align-self-center">
          <img src="/heartFilled.png" className="watchListIcon" alt="fav" />
        </span>

        <span className="align-self-center WatchLinkContainer">
          <Link className="nav-link active position-relative" to="/WatchList">
            <span className="watchListText">WatchList</span>
            <span className="badge bg-white position-absolute top-0 ms-2 translate-middle">
              <span className="favListNum">7</span>
            </span>
          </Link>
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
