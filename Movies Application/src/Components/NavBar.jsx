import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("Movie App");
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "En");

  // Update selected tab based on route
  useEffect(() => {
    if (location.pathname === "/") setSelected("Movie App");
    else if (location.pathname === "/TV-Shows") setSelected("TV Shows");
  }, [location.pathname]);

  // Handle category change
  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);

    if (value === "Movie App") navigate("/");
    else if (value === "TV Shows") navigate("/TV-Shows");
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang.toLowerCase());

    if (newLang === "Ar") {
      document.documentElement.dir = "rtl";
      document.body.style.textAlign = "right";
    } else {
      document.documentElement.dir = "ltr";
      document.body.style.textAlign = "left";
    }

  };

  return (
    <nav className="navbar navbar-expand-lg navTitle">
      <div className="container-fluid">
        <strong className="navbar-brand">
          <select
            className="form-select"
            name="category"
            value={selected}
            onChange={handleChange}
          >
            <option value="Movie App">{t("Movie App")}</option>
            <option value="TV Shows">{t("TV Shows")}</option>
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
            <select
              name="lang"
              className="form-select fw-bold"
              value={lang}
              onChange={handleLanguageChange}
            >
              <option value="En">En</option>
              <option value="Ar">العربية</option>
            </select>

            <span className="watchListIcon align-self-center">
              <img src="/heartFilled.png" className="watchListIcon" />
            </span>

            <span className="align-self-center WatchLinkContainer">
              <Link className="nav-link active position-relative" to="/WatchList">
                <span className="watchListText">{t("WatchList")}</span>
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
