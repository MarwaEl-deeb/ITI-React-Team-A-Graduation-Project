import { useContext } from "react";
import { MainContext } from "../useContext";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Circle from "./Circle";

function Movies() {
  const { movies } = useContext(MainContext);
  const navigate = useNavigate();
  const moviejsx = movies.map((m) => {
    const {
      adult,
      id,
      original_language,
      original_title,
      overview,
      poster_path,
      release_date,
      vote_average,
    } = m;
    const date = new Date(release_date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return (
      <Card key={id} className="m-4 border-0 Card" style={{ width: "200px", height: "420px" }}>
        <Card.Img className="CardImage"
          variant="center"
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={original_title}
          onClick={() => navigate(`/movie/${id}`)}
        />
        <div>
          <Circle value={vote_average} />
        </div>
        <Card.Body className="CardBody">
          <div className="container">
            <div className="row">
              <div className="col-10">
                <Card.Title style={{ fontSize: "17px", fontWeight: "bold" }}>{original_title.length > 25 ? original_title.slice(0, 20) + "..." : original_title}</Card.Title>
                <Card.Text style={{ color: "#7d7b7bc5" }}>{date}</Card.Text>
              </div>
              <div className="col-2 position-relative" style={{ height: "120px" }}>
                <img
                  src="./heart.svg"
                  className="cardFavIcon position-absolute"
                  style={{ top: "25px" }}
                />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  });

  console.log(movies);
  return <div className="movies">{moviejsx}</div>;
}
export default Movies;
