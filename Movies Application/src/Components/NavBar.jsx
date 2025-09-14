import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MainContext } from "../useContext";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedType, setSelectedType } = useContext(MainContext);

  const [favCount, setFavCount] = useState(0);
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState(localStorage.getItem("lang") || "En");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Language
  useEffect(() => {
    if (lang === "Ar") {
      document.documentElement.dir = "rtl";
      document.body.style.textAlign = "right";
      i18n.changeLanguage("ar");
    } else {
      document.documentElement.dir = "ltr";
      document.body.style.textAlign = "left";
      i18n.changeLanguage("en");
    }
  }, [lang, i18n]);

  // Theme
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // Favorites
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
    return () =>
      window.removeEventListener("favoritesChanged", handleFavChange);
  }, []);

  // Handle select change
  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);

    if (value === "movies") {
      navigate("/");
    } else if (value === "tv") {
      navigate("/TV-Shows");
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem("lang", newLang);

    if (newLang === "Ar") {
      document.documentElement.dir = "rtl";
      document.body.style.textAlign = "right";
      i18n.changeLanguage("ar");
    } else {
      document.documentElement.dir = "ltr";
      document.body.style.textAlign = "left";
      i18n.changeLanguage("en");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="navbar navbar-expand-lg navTitle sticky-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <strong className="navbar-brand">
            <select
              className="form-select"
              name="categery"
              value={selectedType} // ← مربوط مباشرة بالـ context
              onChange={handleChange}
            >
              <option value="movies">{t("Movie App")}</option>
              <option value="tv">{t("TV Shows")}</option>
            </select>
          </strong>

          <img
            src={theme === "light" ? "/moon.png" : "/sun.png"}
            className="themeImage ms-2"
            alt="Theme"
            title="Change Theme"
            onClick={toggleTheme}
          />
        </div>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div
            className={`d-flex fw-bold headerRightSide ${
              lang === "Ar" ? "me-auto" : "ms-auto"
            }`}
          >
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

            <span
              className="align-self-center WatchLinkContainer"
              style={{
                paddingRight: lang === "Ar" ? "0px" : "15px",
                paddingLeft: lang === "Ar" ? "30px" : "0px",
              }}
            >
              <Link
                className="nav-link active position-relative"
                to="/WatchList"
              >
                <span
                  className="watchListText"
                  style={{
                    paddingLeft: lang === "Ar" ? "0px" : "12px",
                    paddingRight: lang === "Ar" ? "12px" : "0px",
                  }}
                >
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
