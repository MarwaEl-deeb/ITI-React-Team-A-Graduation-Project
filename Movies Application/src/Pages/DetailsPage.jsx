import { useEffect, useState, useContext } from "react";
import { Spinner, Card, Container, Row, Col } from "react-bootstrap";

import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import CardDetails from "../Components/CardDetails";
import CardList from "../Components/Card";
import { MainContext } from "../useContext";

function DetailsPage() {
  const { id } = useParams();
  const { selectedType } = useContext(MainContext);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const endpoint =
    selectedType == "movies"
      ? `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=dd1481c9866799f1bc15adf106a083fe`
      : `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=dd1481c9866799f1bc15adf106a083fe`;

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, endpoint]);

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="warning" />
      </div>
    );

  if (!movies.length)
    return <p className="text-center">No recommendations found</p>;

  return (
    <>
      <NavBar />
      <CardDetails id={id} selectedType={selectedType} />
      <hr style={{ width: "90%", margin: "2rem auto" }} />
      <CardList data={movies} isRecommendation={true} />
    </>
  );
}

export default DetailsPage;
