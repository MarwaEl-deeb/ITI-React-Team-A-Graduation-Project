import { useEffect, useState, useContext } from "react";
import { Spinner } from "react-bootstrap";
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

  useEffect(() => {
    setLoading(true);
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
        setMovies([]);
        setLoading(false);
      });
  }, [id, selectedType]); // dependency updated

  return (
    <>
      <NavBar />
      <CardDetails id={id} selectedType={selectedType} />
      <hr style={{ width: "90%", margin: "2rem auto" }} />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : movies.length ? (
        <CardList data={movies} isRecommendation={true} />
      ) : (
        <p className="text-center">No recommendations found</p>
      )}
    </>
  );
}

export default DetailsPage;
