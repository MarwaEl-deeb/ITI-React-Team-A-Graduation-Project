import React, { useState, useEffect } from "react";
import {
  Card,
  Badge,
  Button,
  Spinner,
  Row,
  Col,
  Container,
  ListGroup,
} from "react-bootstrap";
import { FaGlobe } from "react-icons/fa";
import RatingStars from "./RatingStars";
import "../index.css";
import { useTranslation } from "react-i18next";

export default function CardDetails({ id, isMovie }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const { t } = useTranslation();

  const [theme, setTheme] = useState(
    document.body.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    const endpoint = isMovie
      ? `https://api.themoviedb.org/3/movie/${id}?api_key=dd1481c9866799f1bc15adf106a083fe`
      : `https://api.themoviedb.org/3/tv/${id}?api_key=dd1481c9866799f1bc15adf106a083fe`;

    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);

        const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFav(storedFavs.some((fav) => fav.id === data.id));
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setMovie(null);
        setLoading(false);
      });
  }, [id, isMovie]);

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


  if (loading) {
    return (
      <div className="loading text-center my-5">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (!movie)
    return <p className="text-center noRecommend p-3">{t("No movie/TV show found")}</p>;

  const formattedDate =
    movie.release_date || movie.first_air_date
      ? new Date(movie.release_date || movie.first_air_date).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "short", day: "numeric" }
      )
      : "N/A";

  const duration = isMovie
    ? movie.runtime
      ? `${movie.runtime} ${t("Min.")}`
      : "N/A"
    : movie.episode_run_time && movie.episode_run_time.length > 0
      ? `${movie.episode_run_time[0]}  ${t("Min./Episode")}`
      : movie.last_episode_to_air?.runtime
        ? `${movie.last_episode_to_air.runtime}  ${t("Min./Episode")}`
        : "N/A";

  const shortOverview = movie.overview
    ? movie.overview.length > 250
      ? movie.overview.substring(0, 250) + "..."
      : movie.overview
    : "No description available";

  const genreColors = ["primary", "success", "danger", "info", "warning"];

  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/fallback.jpg";

  return (
    <Container fluid className="p-3 cardDetailsContainer">
      <Card className="movie-card">
        <Row className="g-2 flex-column flex-md-row m-auto">
          <Col
            md={4}
            className="d-flex justify-content-center justify-content-md-end align-items-stretch"
          >
            <img
              src={posterSrc}
              alt={movie.original_title || movie.name}
              className="CardDetails"
              style={{
                height: "98%",
                width: "auto",
                maxHeight: "500px",
                objectFit: "contain",
                borderRadius: "15px",
              }}
            />
          </Col>

          <Col md={8}>
            <Card.Body>
              <Card.Title className="fw-bold fs-3 pb-2 d-flex justify-content-between align-items-center cardDetailsTitle">
                {movie.original_title || movie.name}
                <img src={
                  isFav
                    ? "/yellowHeart.png"
                    : theme === "light"
                      ? "/heart.svg"
                      : "/emptyYellowHeart.svg"} alt="" />
              </Card.Title>

              <Card.Subtitle className="mb-3 cardDetailsDate">
                {formattedDate}
              </Card.Subtitle>

              <RatingStars
                rating={movie.vote_average || 0}
                votes={movie.vote_count || 0}
              />

              <Card.Text className="mt-3 cardOverview">
                {shortOverview}
              </Card.Text>

              <div className="mb-3 detailsCompanyName">
                {movie.genres?.map((g, index) => (
                  <Badge
                    bg={genreColors[index % genreColors.length]}
                    key={g.id}
                    className="me-1 genre-badge"
                  >
                    {g.name}
                  </Badge>
                ))}
              </div>

              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item
                  className="detailListItem"
                  style={{ backgroundColor: "transparent" }}
                >
                  <span>
                    <strong>{t("Duration")}:</strong> {duration}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item
                  className="detailListItem"
                  style={{ backgroundColor: "transparent" }}
                >
                  <span>
                    <strong>{t("Languages")}:</strong>{" "}
                    {movie.spoken_languages
                      ?.map((lang) => lang.english_name)
                      .join(", ") || "N/A"}
                  </span>
                </ListGroup.Item>
              </ListGroup>

              {movie.production_companies?.length > 0 && (
                <div className="d-flex flex-wrap align-items-center mb-3 cardCompanies">
                  {movie.production_companies.map((company) => (
                    <div
                      key={company.id}
                      className="me-3 mb-2 d-flex flex-column align-items-center"
                    >
                      {company.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          title={company.name}
                          style={{
                            maxHeight: "50px",
                            objectFit: "contain",
                            borderRadius: "6px",
                            padding: "4px",
                          }}
                        />
                      ) : (
                        <span className="small">{company.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {movie.homepage && (
                <Button
                  variant="warning"
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fw-bold"
                >
                  <FaGlobe className="me-2" />
                  {t("Website")}
                </Button>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
