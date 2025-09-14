import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState("Movie App");
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavCount(storedFavs.length);
  }, []);

  useEffect(() => {
    const handleFavChange = () => {
      const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavCount(storedFavs.length);
    };

    window.addEventListener("favoritesChanged", handleFavChange);
    return () => window.removeEventListener("favoritesChanged", handleFavChange);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") setSelected("Movie App");
    else if (location.pathname === "/TV-Shows") setSelected("TV Shows");
  }, [location.pathname]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (value === "Movie App") navigate("/");
    else if (value === "TV Shows") navigate("/TV-Shows");
  };

  return (
    <nav className="navbar navbar-expand-lg navTitle">
      <div className="container-fluid">
        <strong className="navbar-brand">
          <select
            className="form-select"
            name="categery"
            value={selected}
            onChange={handleChange}
          >
            <option value="Movie App">Movie App</option>
            <option value="TV Shows">TV Shows</option>
          </select>
        </strong>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="d-flex ms-auto headerRightSide fw-bold">
            <select name="lang" className="form-select fw-bold">
              <option value="En">En</option>
              <option value="Ar">Ar</option>
            </select>

            <span className="watchListIcon align-self-center">
              <img src="/heartFilled.png" className="watchListIcon" />
            </span>

            <span className="align-self-center WatchLinkContainer">
              <Link className="nav-link active position-relative" to="/WatchList">
                <span className="watchListText">WatchList</span>
                <span className="badge bg-white position-absolute top-0 ms-2 translate-middle">
                  <span className="favListNum">{favCount}</span>
                </span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
