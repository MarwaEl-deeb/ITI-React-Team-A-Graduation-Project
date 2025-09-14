import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("Movie App");
  const [favCount, setFavCount] = useState(0);
  const { t, i18n } = useTranslation();

  // Load saved language or default to "En"
  const [lang, setLang] = useState(localStorage.getItem("lang") || "En");

  // Load saved theme or default to light
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply saved direction + theme on mount and whenever lang/theme changes
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

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // Load favorites count
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavCount(storedFavs.length);
  }, []);

  // Update favorites when changed
  useEffect(() => {
    const handleFavChange = () => {
      const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavCount(storedFavs.length);
    };

    window.addEventListener("favoritesChanged", handleFavChange);
    return () =>
      window.removeEventListener("favoritesChanged", handleFavChange);
  }, []);

  // Update selected nav item
  useEffect(() => {
    if (location.pathname === "/") setSelected("Movie App");
    else if (location.pathname === "/TV-Shows") setSelected("TV Shows");
  }, [location.pathname]);

  // Handle nav category change
  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (value === "Movie App") navigate("/");
    else if (value === "TV Shows") navigate("/TV-Shows");
  };

  // Handle language change
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
    <nav className="navbar navbar-expand-lg navTitle">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
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


          <img src={theme === "light" ? "/moon.png" : "/sun.png"} className="themeImage ms-2" alt="Theme Image" title="Change Theme Icon" onClick={toggleTheme} />

        </div>

        {/* Navbar toggler (mobile) */}
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

        {/* Right/Left side content (language + watchlist) */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div
            className={`d-flex fw-bold headerRightSide ${lang === "Ar" ? "me-auto" : "ms-auto"
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
              <img src={theme === "light" ? "/heartFilled.png" : "/yellowHeart.png"} className="watchListIcon" />
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
