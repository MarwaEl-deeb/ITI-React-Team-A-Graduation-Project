import { useEffect, useState } from "react";
import { Spinner, Card } from "react-bootstrap";
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
    <div className="recommendation-wrapper p-3">
      <h3>Recommendations</h3>
      <div className="d-flex flex-wrap justify-content-start gap-3">
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
            <Card
              key={id}
              className="m-4 mx-auto border-0 Card shadow p-2"
              style={{ width: "220px", height: "400px" }}
            >
              <Card.Img
                className="CardImage"
                variant="center"
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={original_title}
                onClick={() => navigate(`/movie/${id}`)}
                style={{
                  width: "100%", // الصورة تاخد كامل عرض الكارد
                  height: "250px", // تحددي ارتفاع ثابت
                  objectFit: "cover", // الصورة تغطي المساحة بدون تشويه
                  borderRadius: "8px", // اختياري للتزيين
                }}
              />
              <Circle value={vote_average} />
              <Card.Body className="p-2">
                <Card.Title
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                  title={original_title}
                >
                  {original_title.length > 25
                    ? original_title.slice(0, 24) + "..."
                    : original_title}
                </Card.Title>
                <Card.Text style={{ fontSize: "12px", color: "#555" }}>
                  {date}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
