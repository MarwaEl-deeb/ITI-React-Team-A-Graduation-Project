import React, { useState, useEffect } from "react";
import {
  Card,
  Badge,
  Button,
  Spinner,
  Row,
  Col,
  Container,
} from "react-bootstrap";
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

  return (
    <Container fluid className="p-3">
      <Card className="movie-card " style={{ border: "none" }}>
        <Row className="g-2 flex-column flex-md-row">
          {" "}
          <Col md={5} style={{ overflow: "hidden", borderRadius: "12px" }}>
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
              <Card.Title>{movie.original_title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {formattedDate}
              </Card.Subtitle>
              <RatingStars
                rating={movie.vote_average}
                votes={movie.vote_count}
              />
              <Card.Text className="mt-2">{movie.overview}</Card.Text>

              {/* Genres */}
              <div className="mb-2">
                {movie.genres &&
                  movie.genres.map((g) => (
                    <Badge bg="secondary" key={g.id} className="me-1">
                      {g.name}
                    </Badge>
                  ))}
              </div>

              <p>
                <strong>Duration:</strong> {movie.runtime} Min.
              </p>
              <p>
                <strong>Languages:</strong>{" "}
                {movie.spoken_languages
                  .map((lang) => lang.english_name)
                  .join(", ")}
              </p>

              {/* Production Company Logo */}
              <div className="company-logo my-2">
                {movie.production_companies.length > 0 &&
                  movie.production_companies[0].logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.production_companies[0].logo_path}`}
                      alt={movie.production_companies[0].name}
                      style={{ maxHeight: "50px" }}
                    />
                  )}
              </div>

              {/* Website Button */}
              <Button
                variant="outline-warning"
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
