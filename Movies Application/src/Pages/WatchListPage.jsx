import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CardList from "../Components/Card";

function WatchListPage() {
  const { t } = useTranslation();

  const [favorites, setFavorites] = useState([]);
  const [detailedFavorites, setDetailedFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);

    const fetchDetails = async () => {
      const detailsPromises = storedFavs.map(async (item) => {
        const isMovie = item.release_date;
        const endpoint = isMovie
          ? `https://api.themoviedb.org/3/movie/${item.id}?api_key=dd1481c9866799f1bc15adf106a083fe&language=en-US`
          : `https://api.themoviedb.org/3/tv/${item.id}?api_key=dd1481c9866799f1bc15adf106a083fe&language=en-US`;

        try {
          const response = await fetch(endpoint);
          const data = await response.json();
          return {
            ...item,
            overview: data.overview || "No overview available.",
            vote_average: data.vote_average || 0,
            release_date: isMovie ? data.release_date : data.first_air_date,
            original_title: isMovie ? data.original_title : data.name,
          };
        } catch (error) {
          console.error(`Error fetching details for ${item.id}:`, error);
          return item;
        }
      });

      const updatedFavorites = await Promise.all(detailsPromises);
      setDetailedFavorites(updatedFavorites);
    };

    if (storedFavs.length > 0) {
      fetchDetails();
    }
  }, []);


  return (
    <div className="container-fluid mt-4 h-100 " >
      <h3 className="text-start ps-5 " style={{ fontWeight: "bold", marginBottom: "2%" }}>
        {t("Watch List ")}
        <span className="WatchPageNum" style={{ fontSize: "25px" }}>({detailedFavorites.length})</span>
      </h3>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "70vh" }}
      >
        {detailedFavorites.length === 0 ? (
          <>
            <img src="/whatchlist.png" alt="" style={{ width: "200px" }} />
            <p className="mt-3 fs-5 NoResultWt">{t("No Movies in watch list")}</p>
            <Link to="/" className="btn-custom mt-3 w-25">
              {t("Back to home")}
            </Link>
          </>
        ) : (
          <CardList data={detailedFavorites} isWatchlistPage={true}
            setDetailedFavorites={setDetailedFavorites}
          />
        )}
      </div>
    </div>
  );
}

export default WatchListPage;