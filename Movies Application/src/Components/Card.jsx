import { useContext } from "react";
import { MainContext } from "../useContext";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Circle from "./Circle";

function CardList() {
  const { items, selectedType } = useContext(MainContext);
  const navigate = useNavigate();

  return (
    <div className="movies">
      {items.map((item) => {
        const {
          id,
          original_title,
          name,
          poster_path,
          release_date,
          first_air_date,
          vote_average,
        } = item;

        const title = selectedType === "movies" ? original_title : name;
        const dateRaw =
          selectedType === "movies" ? release_date : first_air_date;

        const date = dateRaw
          ? new Date(dateRaw).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
          : "N/A";

        return (
          <Card
            key={id}
            className="m-4 border-0 Card"
            style={{ width: "200px", height: "420px" }}
          >
            <Card.Img
              className="CardImage"
              variant="center"
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={title}
              onClick={() =>
                navigate(
                  selectedType === "movies" ? `/movie/${id}` : `/tv/${id}`
                )
              }
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div>
              <Circle value={vote_average} />
            </div>
            <Card.Body className="CardBody">
              <div className="container">
                <div className="row">
                  <div className="col-10">
                    <Card.Title style={{ fontSize: "17px", fontWeight: "bold" }}>
                      {title?.length > 25
                        ? title.slice(0, 20) + "..."
                        : title}
                    </Card.Title>
                    <Card.Text style={{ color: "#7d7b7bc5" }}>{date}</Card.Text>
                  </div>
                  <div
                    className="col-2 position-relative"
                    style={{ height: "120px" }}
                  >
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
      })}
    </div>
  );
}

export default CardList;
