import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import CardDetails from "../Components/CardDetails";
import Recommendation from "../Components/Recommendation";

function DetailsPage() {
  const { id } = useParams();

  return (
    <>
      <NavBar />
      <CardDetails id={id} />
      <hr style={{ width: "90%", margin: "2rem auto" }} />
      <Recommendation id={id} />
    </>
  );
}

export default DetailsPage;

/*
import { useEffect, useState } from "react";
import { Spinner, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams, } from "react-router-dom";
import NavBar from "../Components/NavBar";
import CardDetails from "../Components/CardDetails";
import CardList from "../Components/Card";



function DetailsPage() {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
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
    <>
      <NavBar />
      <CardDetails id={id} />
      <hr style={{ width: "90%", margin: "2rem auto" }} />
      <CardList data={movies} isRecommendation={true} />
    </>
  );
}

export default DetailsPage;

*/
