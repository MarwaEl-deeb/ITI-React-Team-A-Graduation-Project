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

export default function CardDetails({ id }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=dd1481c9866799f1bc15adf106a083fe`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) {
    return (
      <div className="loading text-center my-5">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (!movie) return <p className="text-center">No movie found</p>;

  const formattedDate = new Date(movie.release_date).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  const shortOverview =
    movie.overview.length > 250
      ? movie.overview.substring(0, 250) + "..."
      : movie.overview;

  const genreColors = ["primary", "success", "danger", "info", "warning"];

  return (
    <Container fluid className="p-3">
      <Card className="movie-card">
        <Row className="g-3 flex-column flex-md-row">
          {/* Poster */}
          <Col
            md={5}
            className="d-flex justify-content-center align-items-stretch"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              className="CardDetails"
              style={{
                height: "98%",
                paddingLeft: "5px",
                paddingRight: "5px",
                margin: "5px",
                width: "auto",
                maxHeight: "500px",
                objectFit: "contain",
                borderRadius: "15px",
              }}
            />
          </Col>

          {/* Details */}
          <Col md={7}>
            <Card.Body>
              <Card.Title className="fw-bold fs-3">
                {movie.original_title}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {formattedDate}
              </Card.Subtitle>

              <RatingStars
                rating={movie.vote_average}
                votes={movie.vote_count}
              />

              <Card.Text className="mt-3">{shortOverview}</Card.Text>

              {/* Genres */}
              <div className="mb-3">
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

              {/* Extra Details */}
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item>
                  <strong>Duration:</strong> {movie.runtime} Min.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Languages:</strong>{" "}
                  {movie.spoken_languages
                    .map((lang) => lang.english_name)
                    .join(", ")}
                </ListGroup.Item>
              </ListGroup>
              {movie.production_companies &&
                movie.production_companies.length > 0 && (
                  <div className="d-flex flex-wrap align-items-center mb-3">
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
                              background: "#fff",
                              borderRadius: "6px",
                              padding: "4px",
                            }}
                          />
                        ) : (
                          <span className="text-muted small">
                            {company.name}
                          </span>
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
                  Website
                </Button>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
