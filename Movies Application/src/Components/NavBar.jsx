import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("Movie App");
  const [favCount, setFavCount] = useState(0);
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "En");

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
      settedLanguage = "En";
    }

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
            <select name="lang" className="form-select fw-bold"
              value={lang}
              onChange={handleLanguageChange}>
              <option value="En">En</option>
              <option value="Ar">العربية</option>
            </select>

            <span className="watchListIcon align-self-center">
              <img src="/heartFilled.png" className="watchListIcon" />
            </span>

            <span className="align-self-center WatchLinkContainer">
              <Link className="nav-link active position-relative" to="/WatchList">
                <span className="watchListText"
                  style={{
                    paddingLeft: lang === "Ar" ? "0px" : "12px",
                    paddingRight: lang === "Ar" ? "12px" : "0px",
                  }}>
                  {t("WatchList")}
                </span>

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
