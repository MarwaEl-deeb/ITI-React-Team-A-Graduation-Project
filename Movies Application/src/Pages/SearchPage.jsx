import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Search from "../Components/Search";
import Card from "react-bootstrap/Card";
import Circle from "../Components/Circle";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  //  https://api.themoviedb.org/3/search/tv?api_key=api_key=dd1481c9866799f1bc15adf106a083fe&query=${query}
  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=dd1481c9866799f1bc15adf106a083fe&query=${query}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results || []);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <>
      <div className="container mt-4">
        <Search />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="my-4">Search Results for "{query}"</h2>
            {results.length > 0 ? (
              <div className="d-flex flex-wrap justify-content-center">
                {results.map((m) => {
                  const {
                    id,
                    original_title,
                    poster_path,
                    release_date,
                    vote_average,
                  } = m;

                  const date = release_date
                    ? new Date(release_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                    : "N/A";

                  return (
                    <Card
                      key={id}
                      className="m-2 border-0 Card"
                      style={{ width: "200px", height: "420px" }}
                    >
                      <Card.Img
                        className="CardImage"
                        variant="center"
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        alt={original_title}
                        onClick={() => navigate(`/movie/${id}`)}
                        style={{ width: "100%", height: "100%" }}
                      />
                      <div>
                        <Circle value={vote_average} />
                      </div>
                      <Card.Body className="CardBody">
                        <div className="container">
                          <div className="row">
                            <div className="col-10">
                              <Card.Title
                                style={{
                                  fontSize: "17px",
                                  fontWeight: "bold",
                                }}
                              >
                                {original_title.length > 25
                                  ? original_title.slice(0, 20) + "..."
                                  : original_title}
                              </Card.Title>
                              <Card.Text style={{ color: "#7d7b7bc5" }}>
                                {date}
                              </Card.Text>
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
            ) : (
              <p style={{ color: "red" }}>NOT FOUND </p>
            )}
          </>
        )}
      </div>
    </>
  );
}
