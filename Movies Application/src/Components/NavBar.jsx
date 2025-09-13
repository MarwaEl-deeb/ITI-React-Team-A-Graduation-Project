import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState("Movie App");

  useEffect(() => {
    if (location.pathname === "/") {
      setSelected("Movie App");
    } else if (location.pathname === "/TV-Shows") {
      setSelected("TV Shows");
    }
  }, [location.pathname]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);

    if (value === "Movie App") {
      navigate("/");
    } else if (value === "TV Shows") {
      navigate("/TV-Shows");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navTitle">
      <div className="container-fluid">
        {/* Brand / Select */}
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

        {/* Toggler (hamburger button) */}
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

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div
            className="d-flex ms-auto headerRightSide fw-bold"
            // style={{ color: "#726625" }}
          >
            <select
              name="lang"
              className="form-select fw-bold"
              // style={{ color: "#726625" }}
            >
              <option value="En">En</option>
              <option value="Ar">Ar</option>
            </select>

            <span className="watchListIcon align-self-center">
              <img src="/heartFilled.png" className="watchListIcon" />
            </span>

            <span className="align-self-center WatchLinkContainer">
              <Link
                className="nav-link active position-relative"
                to="/WatchList"
              >
                <span className="watchListText">WatchList</span>
                <span className="badge bg-white position-absolute top-0 ms-2 translate-middle">
                  <span className="favListNum">0</span>
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
