import { useEffect, useState, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import CardDetails from "../Components/CardDetails";
import CardList from "../Components/Card";
import { useTranslation } from "react-i18next";
import { MainContext } from "../useContext";

function DetailsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const { selectedType } = useContext(MainContext);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);

    const endpoint =
      selectedType === "movies"
        ? `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=dd1481c9866799f1bc15adf106a083fe`
        : `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=dd1481c9866799f1bc15adf106a083fe`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMovies([]);
        setLoading(false);
      });
  }, [id, selectedType]);

  return (
    <>
      <NavBar />

      {/* ✅ مرر isMovie بدل switchValue */}
      <CardDetails id={id} isMovie={selectedType === "movies"} />
      <hr style={{ width: "90%", margin: "2rem auto" }} />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : movies.length ? (
        <div>
          <h1 className="recommendText">{t("Recommendations")}</h1>
          <CardList data={movies} isRecommendation={true} />
        </div>
      ) : (
        <p className="text-center">{t("No recommendations found")}</p>
      )}
    </>
  );
}

export default DetailsPage;
