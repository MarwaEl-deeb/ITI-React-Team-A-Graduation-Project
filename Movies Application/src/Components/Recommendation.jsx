import { useEffect, useState } from "react";
import { Spinner, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Circle from "./Circle";

export default function Recommendation({ id }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=dd1481c9866799f1bc15adf106a083fe`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="warning" />
      </div>
    );

  if (!movies.length)
    return <p className="text-center">No recommendations found</p>;

  return (
    <Container className="recommendation-wrapper py-3">
      <h3>Recommendations</h3>
      <Row className="g-3">
        {movies.map((movie) => {
          const {
            id,
            original_title,
            poster_path,
            release_date,
            vote_average,
          } = movie;
          const date = new Date(release_date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });

          return (
            <Col key={id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="border-0 shadow-sm p-2"
                style={{
                  position: "relative",
                  height: "400px",
                  cursor: "pointer",
                }}
              >
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={original_title}
                  onClick={() => navigate(`/movie/${id}`)}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                {/* Circle فوق الصورة */}
                <div
                  style={{
                    position: "absolute",
                    top: "280px",
                    left: "20px",
                    zIndex: 2,
                  }}
                >
                  <Circle value={vote_average} />
                </div>

                <Card.Body className="p-2">
                  <Card.Title
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginTop: "20px",
                    }}
                    title={original_title}
                  >
                    original_title.length
                  </Card.Title>
                  <Card.Text style={{ fontSize: "12px", color: "#555" }}>
                    {date}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
