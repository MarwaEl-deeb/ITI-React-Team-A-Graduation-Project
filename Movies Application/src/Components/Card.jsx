import { useContext, useState, useEffect } from "react";
import { MainContext } from "../useContext";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Circle from "./Circle";
import RatingStars from "./RatingStars";


function CardList({ data, isRecommendation, isSearch, isWatchlistPage, setDetailedFavorites }) {
  const { items, selectedType } = useContext(MainContext);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const [theme, setTheme] = useState(
    document.body.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.body.getAttribute("data-theme");
      setTheme(currentTheme);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);
  }, []);

  //remove card from watchlist
  const toggleFavorite = (item) => {
    const exists = favorites.some((fav) => fav.id === item.id);
    let updatedFavs;
    if (exists) {
      // Delete the item immediately
      updatedFavs = favorites.filter((fav) => fav.id !== item.id);
    } else {
      updatedFavs = [...favorites, item];
    }

    setFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs)); // update localStorage

    if (isWatchlistPage) {
      setDetailedFavorites((prev) => prev.filter((fav) => fav.id !== item.id));
    }

    window.dispatchEvent(new Event("favoritesChanged"));

  };


  const list = isWatchlistPage ? data : data || items;

  return isWatchlistPage ? (
    <div className="d-flex justify-content-center w-100">
      <div className="row gy-0 w-100  " >
        {list.map((item) => {
          const {
            id,
            original_title,
            name,
            poster_path,
            release_date,
            first_air_date,
            overview,
          } = item;

          const title = selectedType === "movies" ? original_title : name;
          const dateRaw = selectedType === "movies" ? release_date : first_air_date;
          const date = dateRaw
            ? new Date(dateRaw).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
            : "N/A";
          const vote = item.vote_average ?? 0;
          const votesCount = item.vote_count ?? 0;

          const isFav = favorites.some((fav) => fav.id === item.id);

          return (
            // <div key={id} className="col-12 col-md-6  d-flex justify-content-center">
            <div key={id} className="col-12 col-lg-6 d-flex justify-content-center ">

              {/* <Card className="d-flex flex-row h-75 p-3 border-0" style={{ width: "90%", boxShadow: "0 4px 8px rgba(0,0,0,0.2)", borderRadius: "20px" }} > */}
              <Card className="d-flex flex-row p-3 h-75 border-0" style={{ width: "90%", borderRadius: "20px", position: "relative", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>

                <img
                  src={isFav ? "/yellowHeart.png" : "/heart.svg"}
                  alt="fav"
                  style={{
                    width: "25px",
                    cursor: "pointer",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 10,
                  }}
                  onClick={() => toggleFavorite(item)}
                />

                <Card.Img
                  src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : " "}
                  alt={title}
                  className="CardImage"
                  // style={{
                  //   width: "40%",
                  //   height: "100%",
                  //   objectFit: "cover",
                  //   cursor: "pointer",
                  //   borderRadius: "20px"
                  // }}
                  style={{
                    width: "40%",
                    maxWidth: "150px",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(selectedType === "movies" ? `/movie/${id}` : `/tv/${id}`)
                  }}
                />

                <Card.Body className="d-flex flex-column justify-content-between ps-3">
                  <div>
                    {/* <Card.Title style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {title?.length > 25 ? title.slice(0, 100)  : title}
                    </Card.Title> */}
                    <Card.Title style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                      {title?.length > 25 ? title.slice(0, 25) + "..." : title}
                    </Card.Title>

                    {/* <Card.Text style={{ color: "#7d7b7bc5", fontSize: "13px" }}>{date}</Card.Text> */}
                    <Card.Text style={{ color: "#7d7b7bc5", fontSize: "0.8rem" }}>{date}</Card.Text>

                    <RatingStars rating={vote} votes={votesCount} />

                    {/* <Card.Text style={{ fontSize: "14px", marginTop: "5%" }}>
                      {overview ? overview.substring(0, 110).trim() + "..." : "No description available."}
                    </Card.Text> */}
                    <Card.Text style={{ fontSize: "0.85rem", marginTop: "5%" }}>
                      {overview ? overview.substring(0, 110).trim() + "..." : "No description available."}
                    </Card.Text>

                  </div>
                </Card.Body>

              </Card>
            </div>
          );
        })}
      </div>
    </div>
  ) : (

    <div className="movies">
      {list.map((item) => {
        const { id, original_title, name, poster_path, release_date, first_air_date, vote_average } = item;
        const title = selectedType === "movies" ? original_title : name;
        const dateRaw = selectedType === "movies" ? release_date : first_air_date;
        const date = dateRaw
          ? new Date(dateRaw).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
          : "N/A";
        const isFav = favorites.some((fav) => fav.id === id);

        return (
          <Card
            key={id}
            className={isSearch ? "m-3 border-0 Card" : "m-4 border-0 Card"}
            style={{ width: "200px", height: "420px", backgroundColor: "transparent" }}
          >
            <Card.Img
              className="CardImage"
              variant="center"
              src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : " "}
              alt={title}
              onClick={() => navigate(
                selectedType === "movies" ? `/movie/${id}` : `/tv/${id}`
              )}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div>
              <Circle value={vote_average} />
            </div>
            <Card.Body className="CardBody">
              <div className="container">
                <div className="row">
                  <div className="col-10 ">
                    <Card.Title className="cardTitle" style={{ fontSize: "17px", fontWeight: "bold" }}>
                      {title?.length > 25 ? title.slice(0, 100) : title}
                    </Card.Title>
                    <Card.Text className="cardDate">
                      {date}</Card.Text>
                  </div>
                  <div className="col-2 position-relative" style={{ height: "120px" }}>
                    <img
                      src={isFav
                        ? "/yellowHeart.png"
                        : theme === "light"
                          ? "/heart.svg"
                          : "/emptyYellowHeart.svg"}
                      className="cardFavIcon position-absolute"
                      style={{ top: "25px" }}
                      onClick={() => toggleFavorite(item)}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default CardList;


