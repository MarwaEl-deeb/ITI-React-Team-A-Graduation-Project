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

  const formattedDate = new Date(movie.release_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  // cut overview if too long
  const shortOverview =
    movie.overview.length > 250
      ? movie.overview.substring(0, 250) + "..."
      : movie.overview;

  // colors for genres
  const genreColors = ["primary", "success", "danger", "info", "warning"];

  return (
    <Container fluid className="p-3">
      <Card
        className="movie-card shadow-sm"
        style={{
          border: "none",
          borderRadius: "15px",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        <Row className="g-3 flex-column flex-md-row">
          {/* Poster */}
          <Col
            md={5}
            style={{ overflow: "hidden", borderRadius: "10%", padding: "5px" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              className="w-100"
              style={{
                maxHeight: "450px",
                objectFit: "contain",
                borderRadius: "12px",
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
                {movie.genres &&
                  movie.genres.map((g, index) => (
                    <Badge
                      bg={genreColors[index % genreColors.length]}
                      key={g.id}
                      className="me-1"
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
                {movie.production_companies.length > 0 && (
                  <ListGroup.Item>
                    <strong>Company:</strong>{" "}
                    {movie.production_companies[0].name}
                  </ListGroup.Item>
                )}
              </ListGroup>

              {/* Website Button */}
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
